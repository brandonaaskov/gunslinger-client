(function() {
  angular.module('gunslinger').directive('upload', function($fileUploader, firebase) {
    return {
      restrict: 'E',
      templateUrl: 'views/upload.html',
      link: function(scope) {
        var awsPolicy, awsSecret, bucket, policy, signature, uploader, uploads;
        uploads = firebase.uploads;
        bucket = 'fullscreen-tv';
        awsPolicy = {
          expiration: "2020-12-01T12:00:00.000Z",
          conditions: [
            {
              bucket: bucket
            }, ["starts-with", "$key", "uploads/"], {
              "acl": "public-read"
            }
          ]
        };
        awsSecret = 'opZbwB+4r3cg46n/aWtjeNAokW65MucPKvtxg4Uz';
        policy = btoa(JSON.stringify(awsPolicy));
        signature = b64_hmac_sha1(awsSecret, policy) + '=';
        uploader = $fileUploader.create({
          url: "https://" + bucket + ".s3.amazonaws.com/",
          formData: [
            {
              key: 'uploads/${filename}',
              acl: 'public-read',
              AWSAccessKeyId: 'AKIAJXHB75TJZFBB2LOA',
              policy: policy,
              signature: signature
            }
          ],
          autoUpload: true,
          removeAfterUpload: true
        });
        uploader.bind('complete', function(scope, xhr, uploaderRef) {
          return uploads.$add(uploaderRef.file);
        });
        scope.uploader = uploader;
        return console.log('uploader', uploader);
      }
    };
  });

}).call(this);
