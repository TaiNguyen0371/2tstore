import { v2 as cloudinary } from "cloudinary";

export const uploadCloudinaryFile = async (file: File, folder: string) => {
  //config cloudinary
  cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  //   console.log(cloudinary.config());

  // read (convert) provide file to ArrayBuffer
  const buffer = await file.arrayBuffer();
  //   console.log("buffer: ", buffer);

  const bytes = Buffer.from(buffer);
  //   console.log("bytes: ", bytes);

  return new Promise(async (resolve, reject) => {
    // upload file to cloudinary
    await cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto", // autod detech uploadFile type
          folder: folder, // Folder to storage
        },
        async (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        }
      )
      .end(bytes);
  });
};
