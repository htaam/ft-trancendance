import axios from 'axios'

const BACK_PORT = process.env.BACK_PORT;

export const fetchMessage = async () => {
  try {
    const response = await axios.get('${BACK_PORT}/messages');
    return response.data;
  } catch (error) {
    console.error('Error fetching messages', error);
    throw error;
   }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BACK_PORT}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users', error);
    throw error;
  }
};

export const verify2faStatus = async(hash: any) => 
{
  try {
      const info = await axios.post(
          'localhost:4000/auth/2fa/check-on',
          {data: hash}
      )
      return info;
  } catch(e)
  {
      return undefined;
  }
}

export type Form2fa = {
	Code2fa : string;
};

export const login2fa = async (form: Form2fa) => {
	try {
		const data = await axios.post('localhost:4000/auth/2fa/login', form);
		return data;
	} catch (e) {
		return undefined;
	}
}