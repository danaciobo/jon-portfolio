const { REACT_APP_BACKEND_HOST } = process.env;

const baseURL = REACT_APP_BACKEND_HOST || "http://localhost:3005";


export const sendEmailData = async (data) => {
  try {

    const response = await fetch(`${baseURL}/sendEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  catch (err) {
    console.log(err)
    throw new Error('Failed to send email data');
  }
}



// Utility function to upload images to Cloudinary
export const uploadFilesToCloudinary = async (files) => {
  const url = 'https://api.cloudinary.com/v1_1/dt9lltsq3/image/upload';
  const uploadPreset = 'portfolio';

  const fileList = Array.isArray(files) ? files : [files];
  const uploads = fileList.map(file => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    return fetch(url, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => data.secure_url) // Use secure_url or url depending on your preference
    .catch(err => console.error('Cloudinary upload error:', err));
  });

  return Promise.all(uploads);
};

export const shuffleProjects = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};