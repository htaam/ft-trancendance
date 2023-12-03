import { AppBar } from '@mui/material';
import axios, {AxiosInstance} from 'axios';

interface PostArgs<T> {
	url: string;
	data?: T;
}

export  class App {
	private static axiosInstance: AxiosInstance;

	static init() {
		this.axiosInstance = axios.create({
			baseURL: process.env.SITE_URL + ':4000',
			withCredentials: true,
		})
	}
	static async get<ResponseType>(url: string){
		return await App.axiosInstance.get<ResponseType>(url);
	}
	static async getBody<ResponseType, DataType = undefined>({url, data}: PostArgs<DataType>){
		return await App.axiosInstance.get<ResponseType>(url, data!);
	}
	static async post<ResponseType, DataType = undefined>({url, data}: PostArgs<DataType>){
		return App.axiosInstance.post<ResponseType>(url, data);
	}
}


export type FormValues = {
	username: string;
	password: string;
};

export type FormValuesRegister = {
	email: string;
	username: string;
	password: string;
	passwordRepeat: string;
};

export type FormValuesCreateChannel = {
	channelname: string;
	password: string;
	type: number
	owners: string;
};

export type FormValueJoinChannel = {
	id: string;
	password: string;
};

export type UserId = {
	id: string;
};

export type FormOtp = {
	twoFactorAuthenticationCode: string;
};

export type FormOtpPost = {
	twoFactorAuthenticationCode: string;
	uniqueIdentifier: string;
};

export interface UserAuthResponse {
	id:string;
	username: string;
	email: string;
	displayname: string;
	is2FOn: boolean;
	inGame: boolean;
}

export type FormDisplayName = {
    displayname: string;
};

export interface PublicUserResponse {
	id:string;
	avatar: string;
	displayname: string;
	inGame: boolean;
}

export const login = async(loginInput: FormValues) => {
	try {
    const data  = await App.post<UserAuthResponse, FormValues>({
			url: "/auth/login",
			data: loginInput,
		});
		return(data);
	} catch (e) {
		return undefined;
	}
}

export const register = async (registerInput: FormValuesRegister) => {
	await App.post<UserAuthResponse, FormValuesRegister>({
		url: "/auth/register",
		data: registerInput,
	});
}

export const islog = async() => {
	try {
	const { data } = await App.get<UserAuthResponse>("/auth/logcheck",);
		return (data);
	} catch (e) {
		return undefined;
	}
}

export const logout = async() => {
	try {
	const { data } = await App.get<UserAuthResponse>("/auth/logout",);
		return (data);
	} catch (e) {
		return undefined;
	}
}

export  const changeDisplayName = async(registerInput: FormDisplayName) => {
	let data;
	try {
		data = await App.post<UserAuthResponse, FormDisplayName>({
			url: '/user/display-name',
			data: registerInput
		});
		return data;
	} catch (e) {
	}
}

export  const getUserInfo = async() => {
	try {
		const {data} = await App.get<UserAuthResponse>('/user/get-user-information',);
		return data;
	} catch (e) {
		return undefined;
	}
}

export const getPublicUserInfo = async (id: any) => {
	try {
		const userId: UserId = { id: id};
		const data = await App.post<string, UserId>({
			url: '/user/get-user-public-data',
			data: userId
		},)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const uploadProfilePicture = async (profilePicture:  FormData) => {
	await App.post<UserAuthResponse, FormData>({
		url: "/user/upload-image",
		data: profilePicture,
	});
}

export const getProfilePicture = async () => {
	try {
		const data = await App.get<any>('/user/get-user-image',)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const postProfilePicture = async (id: string) => {
	try {
		const userId: UserId = { id: id};
		const data = await App.post<string, UserId>({
			url: '/user/post-user-image',
			data: userId
		},)
		return data;
	} catch (e) {
		return undefined;
	}
}
export const getAllUsers = async () => {
	try {
		const data = await App.get<any>('/user/get-all-users',)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const generateQr = async () => {
	try {
		const data = await App.get<any>('/auth/2fa/generate',)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const activate2fa = async (form: FormOtp) => {
	try {
		const data = await App.post<string, FormOtp>({
			url: '/auth/2fa/turn-on',
			data: form
		},)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const login2fa = async (form: FormOtpPost) => {
	try {
		const data = await App.post<string, FormOtpPost>({
			url: '/auth/2fa/login',
			data: form
		},)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const login2faNeeded = async (hash: any) => {
	try {
		const data = await App.post<string, any>({
			url: '/auth/2fa/check-on',
			data: hash
		},)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const disable2fa = async () => {
	try {
		const data = await App.get<any>('/auth/2fa/disable',)
		return data;
	} catch (e) {
		return undefined;
	}
}

export async function isUserLog() {
	App.init();
	let data = await islog();
	return data;
}

export function isPromise(p: any) {
	return p && Object.prototype.toString.call(p) === "[object Promise]";
  }

/*
export const addChat = async (id: any) => {
	try {
		const data = await App.post<string, any>({
			url: '/users/add-chat-list',
			data: id
		},)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const removeChat = async (id: any) => {
	try {
		const data = await App.post<string, any>({
			url: '/users/remove-chat-list',
			data: id
		},)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const addFriend = async (id: any) => {
	try {
		const data = await App.post<string, any>({
			url: '/users/add-friend-list',
			data: id
		},)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const removeFriend = async (id: any) => {
	try {
		const data = await App.post<string, any>({
			url: '/users/remove-friend-list',
			data: id
		},)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const addBlock = async (id: any) => {
	try {
		const data = await App.post<string, any>({
			url: '/users/add-block-list',
			data: id
		},)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const removeBlock = async (id: any) => {
	try {
		const data = await App.post<string, any>({
			url: '/users/remove-block-list',
			data: id
		},)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const getChatList = async () => {
	try {
		const data = await App.get<any>('/users/get-chat-list',)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const getFriendList = async () => {
	try {
		const data = await App.get<any>('/users/get-friend-list',)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const getBlockList = async () => {
	try {
		const data = await App.get<any>('/users/get-block-list',)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const gameLose = async () => {
	try {
		const data = await App.get<any>('/users/game-lose',)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const setGameNumber = async (num: number) => {
	try {
		const data = await App.get<any>(`/users/set-game-number/${num}`,)
		return data;
	} catch (e) {
		return undefined;
	}
}*/

export const getWebSocketIdByUserId = async (id: string) => {
    try {
        const  data= await App.get<any>(`/user/get-wsid-by-userid/${id}`);
        return data;
    } catch (e) {
        return undefined;
    }
}

export const newWebSocket = async (socketId: string) => {
    try {
        const  data= await App.get<any>(`/user/new-ws/${socketId}`);
        return data;
    } catch (e) {
        return undefined;
    }
}


export const idWebSocket = async () => {
	try {
		const data = await App.get<any>('/user/get-ws-id',)
		return data;
	} catch (e) {
		return undefined;
	}
}

//not implemented yet
export const setWebSocketId = async (id: any) => {
	try {
		const data = await App.post<string, any>({
			url: '/user/id-web-socket',
			data: id
		},)
		return data;
	} catch (e) {
		return undefined;
	}
}
/*

export const getPlayerSlot = async () => {
	try {
		const data = await App.get<any>('/user/get-slot',)
		return {status: true, data: data.data};
	} catch (e: any) {
		return {status: false, error: e};
	}
}*/

export const updateWebSocketId = async (id: any) => {
	try {
		const data = await App.post<string, any>({
			url: '/user/update-ws-id',
			data: id
		},)
		return data;
	} catch (e) {
		return undefined;
	}
}

/*
export const setSlot = async (id: any) => {
	try {
		const data = await App.post<string, any>({
			url: '/users/update-slot-nu',
			data: id
		},)
		return data;
	} catch (e) {
		return undefined;
	}
}

export const getSlot = async () => {
	try {
		const data = await App.get<any>('/users/get-slot-nu')
		return data;
	} catch (e) {
		return undefined;
	}
}

export const inGame = async () => {
	try {
		const data = await App.get<any>('/users/in-game')
		return data;
	} catch (e) {
		return undefined;
	}
}

export const notInGame = async () => {
	try {
		const data = await App.get<any>('/users/not-in-game')
		return data;
	} catch (e) {
		return undefined;
	}
}*/