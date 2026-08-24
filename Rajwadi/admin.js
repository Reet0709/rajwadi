// Initialize Supabase (User must provide these)
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';

let supabase;

if (SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} else {
    console.warn("Supabase credentials not configured yet.");
}

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if(!supabase) return alert('Supabase not configured yet!');

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("Login failed: " + error.message);
    } else {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('dashboard-section').style.display = 'block';
    }
}

async function logout() {
    await supabase.auth.signOut();
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('dashboard-section').style.display = 'none';
}

async function uploadSuit(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.innerText = 'Uploading...';
    submitBtn.disabled = true;

    try {
        const fileInput = document.getElementById('suit-image');
        const file = fileInput.files[0];
        const fileName = `${Date.now()}-${file.name}`;

        // 1. Upload Image to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('suit-images')
            .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get public URL of the uploaded image
        const { data: publicUrlData } = supabase.storage
            .from('suit-images')
            .getPublicUrl(fileName);
            
        const imageUrl = publicUrlData.publicUrl;

        // 2. Insert record into database
        const suitData = {
            name: document.getElementById('suit-name').value,
            fabric: document.getElementById('suit-fabric').value,
            work: document.getElementById('suit-work').value,
            color: document.getElementById('suit-color').value,
            price: document.getElementById('suit-price').value,
            image_url: imageUrl
        };

        const { error: dbError } = await supabase
            .from('unstitched_suits')
            .insert([suitData]);

        if (dbError) throw dbError;

        alert('Success! The suit has been added to the website.');
        document.getElementById('upload-form').reset();
        
    } catch (error) {
        console.error(error);
        alert('Error uploading suit: ' + error.message);
    } finally {
        submitBtn.innerText = 'Upload Suit';
        submitBtn.disabled = false;
    }
}

// Check session on load
window.onload = async () => {
    if(!supabase) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('dashboard-section').style.display = 'block';
    }
};
