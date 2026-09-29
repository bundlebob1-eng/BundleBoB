// macOS: swift -module-cache-path /private/tmp/bundlebob-swift-cache scripts/edit-brand-film.swift
// Source downloads and license references: docs/media-sources.md. No audio is included.
import AVFoundation
import AppKit
let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let output = root.appendingPathComponent("assets/video")
func time(_ seconds: Double) -> CMTime { CMTime(seconds: seconds, preferredTimescale: 600) }
func film(_ name: String, _ shots: [(String, Double, Double)]) throws {
 let composition = AVMutableComposition()
 let track = composition.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
 var cursor = CMTime.zero
 var instructions: [AVMutableVideoCompositionInstruction] = []
 for (source, start, duration) in shots {
  let asset = AVURLAsset(url: URL(fileURLWithPath: source))
  let input = asset.tracks(withMediaType: .video)[0]
  try track.insertTimeRange(CMTimeRange(start: time(start), duration: time(duration)), of: input, at: cursor)
  let size = input.naturalSize.applying(input.preferredTransform)
  let scale = max(1920 / abs(size.width), 1080 / abs(size.height))
  let transform = input.preferredTransform.concatenating(CGAffineTransform(scaleX: scale, y: scale)).concatenating(CGAffineTransform(translationX: (1920-abs(size.width)*scale)/2, y: (1080-abs(size.height)*scale)/2))
  let layer = AVMutableVideoCompositionLayerInstruction(assetTrack: track)
  layer.setTransform(transform, at: cursor)
  let instruction = AVMutableVideoCompositionInstruction()
  instruction.timeRange = CMTimeRange(start: cursor, duration: time(duration))
  instruction.layerInstructions = [layer]
  instructions.append(instruction)
  cursor = cursor + time(duration)
 }
 let video = AVMutableVideoComposition()
 video.renderSize = CGSize(width: 1920, height: 1080)
 video.frameDuration = CMTime(value: 1, timescale: 25)
 video.instructions = instructions
 let url = output.appendingPathComponent(name + ".mp4")
 if FileManager.default.fileExists(atPath: url.path) { try FileManager.default.removeItem(at: url) }
 let exporter = AVAssetExportSession(asset: composition, presetName: AVAssetExportPreset1920x1080)!
 exporter.videoComposition = video
 exporter.outputURL = url
 exporter.outputFileType = .mp4
 exporter.shouldOptimizeForNetworkUse = true
 let semaphore = DispatchSemaphore(value: 0)
 exporter.exportAsynchronously { semaphore.signal() }
 semaphore.wait()
 guard exporter.status == .completed else { throw exporter.error! }
 let gen = AVAssetImageGenerator(asset: AVURLAsset(url: url))
 gen.appliesPreferredTrackTransform = true
 gen.maximumSize = CGSize(width: 1600, height: 900)
 let frame = try gen.copyCGImage(at: time(1), actualTime: nil)
 let bitmap = NSBitmapImageRep(cgImage: frame)
 try bitmap.representation(using: .jpeg, properties: [.compressionFactor: 0.88])!.write(to: root.appendingPathComponent("assets/images/\(name).jpg"))
 print("Exported", name, CMTimeGetSeconds(cursor), "seconds")
}
try film("business-in-motion", [
 ("/private/tmp/bundlebob-film-people.mp4", 12, 6),
 ("/private/tmp/bundlebob-film-warehouse.mp4", 5, 5),
 (root.appendingPathComponent("assets/video/construction-field.mp4").path, 1, 5),
 ("/private/tmp/bundlebob-film-racks.mp4", 2, 4)
])
