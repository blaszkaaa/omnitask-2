import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  keyFilename: process.env.GCS_KEY_FILE,
})

const bucketName = process.env.GCS_BUCKET_NAME || 'omnitask-images'
const bucket = storage.bucket(bucketName)

export async function uploadImage(
  file: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const blob = bucket.file(`OmniTask/Blog/${filename}`)
  const blobStream = blob.createWriteStream({
    resumable: false,
    contentType,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  })

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => reject(err))
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/OmniTask/Blog/${filename}`
      resolve(publicUrl)
    })
    blobStream.end(file)
  })
}

export function getPublicUrl(filename: string): string {
  return `https://storage.googleapis.com/${bucketName}/OmniTask/Blog/${filename}`
}
