import { VercelRequest, VercelResponse } from '@vercel/node';
import AWS from 'aws-sdk';

// Configure DigitalOcean Spaces
const s3 = new AWS.S3({
  endpoint: 'https://neostream.nyc3.digitaloceanspaces.com',
  s3ForcePathStyle: true, // Needed with DigitalOcean Spaces
  accessKeyId: 'DO00R2MDX9Z6CGKLW6Q7', // Replace with your access key
  secretAccessKey: 'reKDR/BsrYO/1au6u0gYoXxs00Vrv4+hznLCrM/LAJ8', // Replace with your secret key
  region: 'nyc3'
});

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const { date } = req.query;

  const params = {
    Bucket: 'your-bucket-name', // Replace with your bucket name
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    let videos = data.Contents?.map((obj: AWS.S3.Object) => obj.Key).filter((key): key is string => key !== undefined) || [];

    if (date) {
      videos = videos.filter((video: string) => video.includes(date as string));
    }

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching videos' });
  }
};
