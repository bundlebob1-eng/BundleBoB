// Two 12-second, silent 1080p motion illustrations. Generated photography + native graphics.
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
 let input=AVAssetWriterInput(mediaType:.video,outputSettings:[AVVideoCodecKey:AVVideoCodecType.h264,AVVideoWidthKey:1920,AVVideoHeightKey:1080,AVVideoCompressionPropertiesKey:[AVVideoAverageBitRateKey:2500000,AVVideoMaxKeyFrameIntervalKey:50]])
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
   rounded(NSRect(x:0,y:0,width:1920,height:1080),NSColor.black.withAlphaComponent(0.22),0)
   text("BUNDLEBOB / EVERYDAY OPERATIONS",90,965,24,.white,true)
   text(name=="admin-overhead" ? "When admin becomes the job." : "A clearer handoff.",90,875,48,.white,true)
   let labels=name=="admin-overhead" ? ["A request in the inbox","The same details in a spreadsheet","Another follow-up for approval"] : ["One place to send the request","An owner and a clear next step","Ready for human review"]
   for i in 0..<3 {
    let entry=Double(i)*2.7+0.6;let progress=min(1,max(0,(t-entry)/0.6));if progress<=0{continue}
    let y=CGFloat(660-i*152)-CGFloat((1-progress)*24)
    rounded(NSRect(x:90,y:y,width:680,height:126),ink.withAlphaComponent(CGFloat(progress)*0.96))
    rounded(NSRect(x:116,y:y+38,width:50,height:50),sage.withAlphaComponent(CGFloat(progress)),14)
    text(String(i+1),132,y+49,24,ink,true)
    text(labels[i],188,y+66,25,NSColor.white.withAlphaComponent(CGFloat(progress)),true)
    let sub=name=="admin-overhead" ? ["Read it. Re-enter it. Check it.","Find the latest version.","Wait for the missing context."][i] : ["Capture the information once.","Keep the team in the loop.","People stay in the decision."][i]
    text(sub,188,y+29,21,NSColor.white.withAlphaComponent(CGFloat(progress)*0.85))
   }
   text("Illustrative workflow / AI-generated imagery",90,58,20,.white)
   rounded(NSRect(x:90,y:26,width:1740*CGFloat(t/12),height:3),sage,0)
   NSGraphicsContext.restoreGraphicsState()
   var buffer:CVPixelBuffer?;CVPixelBufferPoolCreatePixelBuffer(nil,adaptor.pixelBufferPool!,&buffer)
   ci.render(CIImage(cgImage:bitmap.cgImage!),to:buffer!)
   if !adaptor.append(buffer!,withPresentationTime:CMTime(value:Int64(frame),timescale:25)){fatalError(writer.error!.localizedDescription)}
  }
 }
 input.markAsFinished();let done=DispatchSemaphore(value:0);writer.finishWriting{done.signal()};done.wait()
 guard writer.status == .completed else {throw writer.error!};print("Rendered",name)
}
