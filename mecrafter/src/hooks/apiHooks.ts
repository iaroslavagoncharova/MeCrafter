import { useEffect, useState } from "react";
import { fetchData } from "../lib/functions";
import { Values } from "../types/LocalTypes";
import { LoginResponse, MediaResponse, UploadResponse, UserResponse } from "../types/MessageTypes";
import { MediaItem, MediaItemWithOwner, User } from "../types/DBTypes";

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);

  const getMedia = async () => {
    try {
      const mediaItems = await fetchData<MediaItem[]>(
        import.meta.env.VITE_MEDIA_API + '/media',
      );
      const itemsWithOwner: MediaItemWithOwner[] = await Promise.all(
        mediaItems.map(async (item) => {
          const owner = await fetchData<User>(
            import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
          );
          const itemWithOwner: MediaItemWithOwner = {
            ...item,
            username: owner.username,
          };
          return itemWithOwner;
        }),
      );
      setMediaArray(itemsWithOwner);
      console.log('mediaArray updated:', itemsWithOwner);
    } catch (error) {
      console.error('getMedia failed', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  const postMedia = (
    file: UploadResponse,
    inputs: Record<string, string>,
    token: string,
  ) => {
    const media: Omit<
      MediaItem,
      'media_id' | 'user_id' | 'thumbnail' | 'created_at' | 'username'
    > = {
      title: inputs.title,
      description: inputs.description,
      filename: file.data.filename,
      filesize: file.data.filesize,
      media_type: file.data.media_type,
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(media),
    };
    return fetchData<MediaResponse>(
      import.meta.env.VITE_MEDIA_API + '/media',
      options,
    );
  };

  return {mediaArray, postMedia};
};

const useUser = () => {
  const getUserByToken = async (token: string) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const result =  await fetchData<UserResponse>(import.meta.env.VITE_AUTH_API + "/users/token", options);
    console.log(result);
    return result;
  };
  const postUser = async (user: Record<string, string>) => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    await fetchData(import.meta.env.VITE_AUTH_API + "/users", options);
  };
  return { getUserByToken, postUser };
};
const useAuth = () => {
    const postLogin = async (values: Values) => {
        const options: RequestInit = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        };
        return await fetchData<LoginResponse>(import.meta.env.VITE_AUTH_API + "/auth/login", options);
    };
    return { postLogin };
};

const useFile = () => {
  const postFile = async (file: File, token: string) => {
    const formData = new FormData();
    formData.append('file', file);
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };
    return await fetchData<UploadResponse>(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      options,
    );
  };

  return {postFile};
};
export { useUser, useAuth, useMedia, useFile }