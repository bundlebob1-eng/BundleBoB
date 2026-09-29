import AVFoundation
let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let names = CommandLine.arguments.count > 1 ? Array(CommandLine.arguments.dropFirst()) : ["connected-world", "people-process-technology"]
for name in names {
 let url = root.appendingPathComponent("assets/video/\(name).mp4")
 let asset = AVURLAsset(url: url)
 let track = asset.tracks(withMediaType: .video)[0]
 let reader = try AVAssetReader(asset: asset)
 let output = AVAssetReaderTrackOutput(track: track, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String:kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange])
 reader.add(output)
 let destination = URL(fileURLWithPath: "/private/tmp/\(name)-web.mp4")
 if FileManager.default.fileExists(atPath: destination.path) { try FileManager.default.removeItem(at: destination) }
 let writer = try AVAssetWriter(outputURL: destination, fileType: .mp4)
 writer.shouldOptimizeForNetworkUse = true
 let input = AVAssetWriterInput(mediaType: .video, outputSettings: [AVVideoCodecKey:AVVideoCodecType.h264,AVVideoWidthKey:1920,AVVideoHeightKey:1080,AVVideoCompressionPropertiesKey:[AVVideoAverageBitRateKey:3000000,AVVideoProfileLevelKey:AVVideoProfileLevelH264HighAutoLevel,AVVideoMaxKeyFrameIntervalKey:50]])
 writer.add(input)
 writer.startWriting(); reader.startReading(); writer.startSession(atSourceTime: .zero)
 while let sample = output.copyNextSampleBuffer() {
  while !input.isReadyForMoreMediaData { Thread.sleep(forTimeInterval: 0.005) }
  guard input.append(sample) else { throw writer.error! }
 }
 guard reader.status == .completed else { throw reader.error! }
 input.markAsFinished()
 let done = DispatchSemaphore(value: 0)
 writer.finishWriting { done.signal() }; done.wait()
 guard writer.status == .completed else { throw writer.error! }
 try FileManager.default.removeItem(at: url)
 try FileManager.default.copyItem(at: destination, to: url)
 print("Optimized", name)
}
