angular.module('gunslinger').directive 'upload', ($fileUploader, firebase) ->
  restrict: 'E'
  templateUrl: 'views/upload.html'
  link: (scope) ->
    uploads = firebase.uploads
    bucket = 'fullscreen-tv'
    awsPolicy =
      expiration: "2020-12-01T12:00:00.000Z"
      conditions: [
        { bucket: bucket },
        ["starts-with", "$key", "uploads/"],
        {"acl": "public-read"}
      ]
    
    policy = btoa JSON.stringify(awsPolicy)
    signature = b64_hmac_sha1(awsSecret, policy) + '=' # not sure why this function doesn't add the needed equals sign at the end

    uploader = $fileUploader.create
      url: "https://#{bucket}.s3.amazonaws.com/"
      formData: [
        key: 'uploads/${filename}'
        acl: 'public-read',
        AWSAccessKeyId: 'AKIAJXHB75TJZFBB2LOA',
        policy: policy,
        signature: signature
      ]
      autoUpload: true
      removeAfterUpload: true

    uploader.bind 'complete', (scope, xhr, uploaderRef) -> uploads.$add uploaderRef.file
    scope.uploader = uploader
    console.log 'uploader', uploader