import AVFoundation
let root=URL(fileURLWithPath:FileManager.default.currentDirectoryPath)
for name in ["business-in-motion","admin-overhead","clearer-handoffs","construction-field"] {
 let asset=AVURLAsset(url:root.appendingPathComponent("assets/video/\(name).mp4"))
 let reader=try AVAssetReader(asset:asset)
 let output=AVAssetReaderTrackOutput(track:asset.tracks(withMediaType:.video)[0],outputSettings:[kCVPixelBufferPixelFormatTypeKey as String:kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange])
 reader.add(output)
 let destination=root.appendingPathComponent("assets/video/\(name)-mobile.mp4")
 if FileManager.default.fileExists(atPath:destination.path){try FileManager.default.removeItem(at:destination)}
 let writer=try AVAssetWriter(outputURL:destination,fileType:.mp4);writer.shouldOptimizeForNetworkUse=true
 let input=AVAssetWriterInput(mediaType:.video,outputSettings:[AVVideoCodecKey:AVVideoCodecType.h264,AVVideoWidthKey:1280,AVVideoHeightKey:720,AVVideoCompressionPropertiesKey:[AVVideoAverageBitRateKey:650000,AVVideoProfileLevelKey:AVVideoProfileLevelH264MainAutoLevel,AVVideoMaxKeyFrameIntervalKey:50]])
 writer.add(input);writer.startWriting();reader.startReading();writer.startSession(atSourceTime:.zero)
 while let sample=output.copyNextSampleBuffer(){while !input.isReadyForMoreMediaData{Thread.sleep(forTimeInterval:0.004)};guard input.append(sample) else {throw writer.error!}}
 guard reader.status == .completed else {throw reader.error!}
 input.markAsFinished();let done=DispatchSemaphore(value:0);writer.finishWriting{done.signal()};done.wait();guard writer.status == .completed else{throw writer.error!};print("Mobile export:",name)
}
