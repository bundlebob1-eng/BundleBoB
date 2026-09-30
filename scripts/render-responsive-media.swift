// Render directly from the licensed source files, once per screen shape.
// Sources and download URLs are recorded in docs/media-sources.md.
import AVFoundation
import AppKit
let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let output = root.appendingPathComponent("assets/video")
let posters=URL(fileURLWithPath:"/private/tmp/bundlebob-responsive-posters")
try FileManager.default.createDirectory(at:posters,withIntermediateDirectories:true)
func time(_ s: Double) -> CMTime { CMTime(seconds:s,preferredTimescale:600) }
struct Shot { let path:String; let start:Double; let duration:Double; let focus:CGFloat }
func render(_ name:String,_ shots:[Shot],_ width:Int,_ height:Int,_ bitrate:Int) throws {
 let composition=AVMutableComposition()
 let track=composition.addMutableTrack(withMediaType:.video,preferredTrackID:kCMPersistentTrackID_Invalid)!
 var cursor=CMTime.zero; var instructions:[AVMutableVideoCompositionInstruction]=[]
 for shot in shots {
  let source=AVURLAsset(url:URL(fileURLWithPath:shot.path));let input=source.tracks(withMediaType:.video)[0]
  try track.insertTimeRange(CMTimeRange(start:time(shot.start),duration:time(shot.duration)),of:input,at:cursor)
  let size=input.naturalSize.applying(input.preferredTransform)
  let scale=max(CGFloat(width)/abs(size.width),CGFloat(height)/abs(size.height))
  let x=max(CGFloat(width)-abs(size.width)*scale,min(0,CGFloat(width)/2-abs(size.width)*scale*shot.focus))
  let transform=input.preferredTransform.concatenating(CGAffineTransform(scaleX:scale,y:scale)).concatenating(CGAffineTransform(translationX:x,y:(CGFloat(height)-abs(size.height)*scale)/2))
  let layer=AVMutableVideoCompositionLayerInstruction(assetTrack:track);layer.setTransform(transform,at:cursor)
  let instruction=AVMutableVideoCompositionInstruction();instruction.timeRange=CMTimeRange(start:cursor,duration:time(shot.duration));instruction.layerInstructions=[layer];instructions.append(instruction);cursor=cursor+time(shot.duration)
 }
 let video=AVMutableVideoComposition();video.renderSize=CGSize(width:width,height:height);video.frameDuration=CMTime(value:1,timescale:25);video.instructions=instructions
 let reader=try AVAssetReader(asset:composition)
 let decoded=AVAssetReaderVideoCompositionOutput(videoTracks:[track],videoSettings:[kCVPixelBufferPixelFormatTypeKey as String:kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange]);decoded.videoComposition=video;reader.add(decoded)
 let destination=output.appendingPathComponent(name+".mp4")
 if FileManager.default.fileExists(atPath:destination.path){try FileManager.default.removeItem(at:destination)}
 let writer=try AVAssetWriter(outputURL:destination,fileType:.mp4);writer.shouldOptimizeForNetworkUse=true
 let encoded=AVAssetWriterInput(mediaType:.video,outputSettings:[AVVideoCodecKey:AVVideoCodecType.h264,AVVideoWidthKey:width,AVVideoHeightKey:height,AVVideoCompressionPropertiesKey:[AVVideoAverageBitRateKey:bitrate,AVVideoProfileLevelKey:AVVideoProfileLevelH264HighAutoLevel,AVVideoMaxKeyFrameIntervalKey:25,AVVideoExpectedSourceFrameRateKey:25]])
 writer.add(encoded);guard writer.startWriting(),reader.startReading() else{fatalError("Cannot begin export")};writer.startSession(atSourceTime:.zero)
 while let sample=decoded.copyNextSampleBuffer(){while !encoded.isReadyForMoreMediaData{Thread.sleep(forTimeInterval:0.003)};guard encoded.append(sample) else{throw writer.error!}}
 guard reader.status == .completed else{throw reader.error!};encoded.markAsFinished();let done=DispatchSemaphore(value:0);writer.finishWriting{done.signal()};done.wait();guard writer.status == .completed else{throw writer.error!}
 let generator=AVAssetImageGenerator(asset:AVURLAsset(url:destination));generator.appliesPreferredTrackTransform=true
 let frame=try generator.copyCGImage(at:time(0),actualTime:nil);let bitmap=NSBitmapImageRep(cgImage:frame)
 try bitmap.representation(using:.jpeg,properties:[.compressionFactor:0.92])!.write(to:posters.appendingPathComponent("\(name).jpg"))
 let bytes=try FileManager.default.attributesOfItem(atPath:destination.path)[.size] as! Int
 print("Rendered \(name): \(width)×\(height), \(CMTimeGetSeconds(cursor))s, \(bytes/1024)KB")
}
let people="/private/tmp/bundlebob-film-people.mp4",warehouse="/private/tmp/bundlebob-film-warehouse.mp4",field="/private/tmp/bundlebob-film-field-uhd.mp4",team="/private/tmp/bundlebob-film-collaboration.mp4"
let hero=[Shot(path:people,start:12,duration:6,focus:0.34),Shot(path:warehouse,start:5,duration:5,focus:0.55),Shot(path:field,start:1,duration:5,focus:0.52)]
let fieldShot=[Shot(path:field,start:0,duration:8,focus:0.52)]
let selected=CommandLine.arguments.dropFirst()
if selected.isEmpty || selected.contains("hero") {
 try render("business-in-motion-hd",hero,2560,1440,6500000)
 try render("business-in-motion-tablet",hero,1440,1920,4500000)
 try render("business-in-motion-portrait",hero,1080,1920,3500000)
}
if selected.isEmpty || selected.contains("supporting") {
 let admin=[Shot(path:people,start:2,duration:10,focus:0.5)]
 let handoffs=[Shot(path:team,start:0,duration:8,focus:0.5)]
 for (name,shots) in [("admin-overhead",admin),("clearer-handoffs",handoffs)] {
  try render(name+"-hd",shots,1920,1080,4500000)
  try render(name+"-mobile-hd",shots,1280,720,2200000)
 }
 try render("construction-field-hd",fieldShot,2560,1440,5500000)
 try render("construction-field-tablet",fieldShot,1440,1920,4000000)
 try render("construction-field-portrait",fieldShot,1080,1920,3000000)
}

if selected.contains("balanced") {
 for (name,shots) in [("business-in-motion",hero),("construction-field",fieldShot)] {
  try render(name+"-balanced",shots,1920,1080,2000000)
  try render(name+"-tablet-balanced",shots,1080,1440,1600000)
  try render(name+"-portrait-balanced",shots,720,1280,1300000)
 }
}
