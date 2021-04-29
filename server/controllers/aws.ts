import { Request, Response } from 'express'
import aws from 'aws-sdk'

aws.config.region = 'ap-southeast-1'

const Controller = {
  // sign s3 url for image uploading
  signS3: async (req: Request, res: Response): Promise<void> => {
    const S3_BUCKET = process.env.S3_BUCKET_NAME
    const s3 = new aws.S3()
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: req.body.fileName,
      Expires: 60,
      ContentType: req.body.fileType,
      ACL: 'public-read',
    }
    console.log(process.env.S3_BUCKET_NAME)
    console.log(S3_BUCKET)
    console.log('AWS', s3Params)
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err)
        return res.status(500).json(err)
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${req.body.fileName}`,
      }
      res.status(200).json(returnData)
    })
  },
}

export default Controller
