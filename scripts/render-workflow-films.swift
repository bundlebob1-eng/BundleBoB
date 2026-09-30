// Two 12-second silent photographic loops. All explanatory text lives in HTML.
import AppKit
import AVFoundation
import CoreImage
let root=URL(fileURLWithPath:FileManager.default.currentDirectoryPath)
let ink=NSColor(calibratedRed:0.09,green:0.12,blue:0.10,alpha:1)
let sage=NSColor(calibratedRed:0.71,green:0.79,blue:0.66,alpha:1)
func text(_ value:String,_ x:CGFloat,_ y:CGFloat,_ size:CGFloat,_ color:NSColor,_ bold:Bool=false){
 (value as NSString).draw(at:NSPoint(x:x,y:y),withAttributes:[.font:NSFont.systemFont(ofSize:size,weight:bold ? .semibold:.regular),.foregroundColor:color])
}
func rounded(_ rect:NSRect,_ color:NSColor,_ radius:CGFloat=18){color.setFill();NSBezierPath(roundedRect:rect,xRadius:radius,yRadius:radius).fill()}
for (name,source) in [("admin-overhead","service-ai"),("clearer-handoffs","service-software")] {
 let url=root.appendingPathComponent("assets/video/\(name).mp4")
 if FileManager.default.fileExists(atPath:url.path){try FileManager.default.removeItem(at:url)}
 let writer=try AVAssetWriter(outputURL:url,fileType:.mp4);writer.shouldOptimizeForNetworkUse=true
 let input=AVAssetWriterInput(mediaType:.video,outputSettings:[AVVideoCodecKey:AVVideoCodecType.h264,AVVideoWidthKey:1920,AVVideoHeightKey:1080,AVVideoCompressionPropertiesKey:[AVVideoAverageBitRateKey:1500000,AVVideoMaxKeyFrameIntervalKey:50]])
 let adaptor=AVAssetWriterInputPixelBufferAdaptor(assetWriterInput:input,sourcePixelBufferAttributes:[kCVPixelBufferPixelFormatTypeKey as String:kCVPixelFormatType_32ARGB,kCVPixelBufferWidthKey as String:1920,kCVPixelBufferHeightKey as String:1080])
 writer.add(input);writer.startWriting();writer.startSession(atSourceTime:.zero)
 let photo=NSImage(contentsOf:root.appendingPathComponent("assets/images/generated/\(source).png"))!
 let ci=CIContext(options:[.useSoftwareRenderer:false])
 for frame in 0..<300 {
  while !input.isReadyForMoreMediaData{Thread.sleep(forTimeInterval:0.004)}
  autoreleasepool {
   let bitmap=NSBitmapImageRep(bitmapDataPlanes:nil,pixelsWide:1920,pixelsHigh:1080,bitsPerSample:8,samplesPerPixel:4,hasAlpha:true,isPlanar:false,colorSpaceName:.deviceRGB,bytesPerRow:0,bitsPerPixel:0)!
   NSGraphicsContext.saveGraphicsState();NSGraphicsContext.current=NSGraphicsContext(bitmapImageRep:bitmap)
   let t=Double(frame)/25;let zoom=1+0.025*sin(t/12 * .pi)
   photo.draw(in:NSRect(x:-1920*(zoom-1)/2,y:-1080*(zoom-1)/2,width:1920*zoom,height:1080*zoom))
   NSGraphicsContext.restoreGraphicsState()
   var buffer:CVPixelBuffer?;CVPixelBufferPoolCreatePixelBuffer(nil,adaptor.pixelBufferPool!,&buffer)
   ci.render(CIImage(cgImage:bitmap.cgImage!),to:buffer!)
   if !adaptor.append(buffer!,withPresentationTime:CMTime(value:Int64(frame),timescale:25)){fatalError(writer.error!.localizedDescription)}
  }
 }
 input.markAsFinished();let done=DispatchSemaphore(value:0);writer.finishWriting{done.signal()};done.wait()
 guard writer.status == .completed else {throw writer.error!};print("Rendered",name)
}
