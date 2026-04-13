import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  keyFilename: process.env.GCS_KEY_FILE,
})

const bucketNameRaw = process.env.GCS_BUCKET_NAME || 'twoj-projekt-zdjecia2'
const bucketName = bucketNameRaw.split('/')[0]
const bucket = storage.bucket(bucketName)

// Extract prefix from bucketNameRaw (e.g. "OmniTask")
const bucketPrefix = bucketNameRaw.includes('/') ? bucketNameRaw.substring(bucketNameRaw.indexOf('/') + 1) + '/' : '' 

export async function uploadImage(
  file: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  // Construct the full object path: e.g. OmniTask/Blog/1.svg
  const objectPath = `${bucketPrefix}Blog/${filename}`
  const blob = bucket.file(objectPath)
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
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${objectPath}`
      resolve(publicUrl)
    })
    blobStream.end(file)
  })
}

export function getPublicUrl(filename: string): string {
  // Always clean up any starting slashes just in case
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename;
  const objectPath = `${bucketPrefix}Blog/${cleanFilename}`
  return `https://storage.googleapis.com/${bucketName}/${objectPath}`
}
