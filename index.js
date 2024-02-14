const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const outStream = fs.createWriteStream("merged.mp4");

const proc = ffmpeg()
	.addInput("video.mp4")
	.addInput("audio.m4a")
	.format("mp4")
	.outputOptions("-movflags frag_keyframe+empty_moov")
	.on("progress", function (progress) {
		console.log(progress);
	})
	.on("error", function (err) {
		console.log("An error occurred: " + err.message);
	})
	.on("end", function () {
		console.log("Processing finished !");
	})
	.writeToStream(outStream);
