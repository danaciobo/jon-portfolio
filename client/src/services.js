const { REACT_APP_BACKEND_HOST } = process.env;

const baseURL = REACT_APP_BACKEND_HOST;


export const sendEmailData = async (data) => {
  try {

    const response = await fetch(`${baseURL}/send-email`, {
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