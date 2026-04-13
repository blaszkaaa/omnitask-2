import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  keyFilename: process.env.GCS_KEY_FILE,
})

const bucketName = process.env.GCS_BUCKET_NAME || 'twoj-projekt-zdjecia2'
const bucket = storage.bucket(bucketName)

export async function uploadImage(
  file: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const blob = bucket.file(filename)
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
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`
      resolve(publicUrl)
    })
    blobStream.end(file)
  })
}

export function getPublicUrl(filename: string): string {
  // Always clean up any starting slashes just in case
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename;
  return `https://storage.googleapis.com/${bucketName}/${cleanFilename}`
}
