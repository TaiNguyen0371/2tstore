import FileModel from "@/models/fileModel";
import { uploadCloudinaryFile } from "@/lib/cloudinary";
import { connect } from "@/database/config";
connect();
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Convert upload file type
    const uploadFile = formData.get("uploadFile") as unknown as File;

    if (!uploadFile) {
      // Return while uploadFile is null
      return Response.json({ message: "Could not upload file" });
    }
    const uploadedFile: any = await uploadCloudinaryFile(
      uploadFile,
      "2T Store"
    );

    const file = await FileModel.create({
      url: uploadedFile?.secure_url,
      secure_url: uploadedFile?.secure_url,
      public_id: uploadedFile?.public_id,
    });

    return Response.json({ message: "Upload file success", data: file });
  } catch (error: any) {
    return Response.json(
      {
        message: "Could not upload file",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
