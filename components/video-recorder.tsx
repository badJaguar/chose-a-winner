"use client";
import { Box, Button, Divider, IconButton, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { useState, useRef } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DownloadIcon from '@mui/icons-material/Download';
import { useTheme } from '@mui/material/styles';

export default function VideoRecorder() {
  const modal = document?.getElementById('modal-winner')!;

  const [videoSrc, setVideoSrc] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const theme = useTheme();
  const mediaQuery = useMediaQuery(theme.breakpoints.up('md'));

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });

      const mediaRecorder = new MediaRecorder(mediaStream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoSrc(url);

        mediaStream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      mediaRecorder.start();
      modal.classList.add('yellow-frame');
    } catch (error) {
      console.error('Error recording screen:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      modal.classList.remove('yellow-frame');
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const resetRecording = () => {
    setVideoSrc('');
  };

  const downloadVideo = () => {
    if (videoSrc) {
      const link = document.createElement('a');
      link.href = videoSrc;
      link.download = 'screen_record.webm';
      link.click();
    }
  };

  async function handle() {
    const resp = await fetch('/api/examples/pupeteer');

    const videoId = await resp.json();

    setVideoSrc(`/video/${videoId.ID}.mp4`);
  }
  console.log(videoSrc);


  mediaRecorderRef.current?.addEventListener('stop', stopRecording);

  return (
    <div className={`${mediaQuery ? 'video-controls-grid-layout' : undefined} space-x-2 border-t pt-6`}
      style={{
        gridArea: '2 / 1 / 3 / 3',
      }}
    >
      <Typography variant="h3"
        style={{
          gridArea: '1 / 1 / 1 / 3',
        }}>
        Record a video
      </Typography>
      <video src={videoSrc} controls className="min-h-[280px] rounded-md" />
      <div>
        <Box component="fieldset" className="flex justify-center space-x-2 w-full">
          <Tooltip title="Stop Recording">
            <span>
              <IconButton size="large" onClick={stopRecording} disabled={!isRecording}>
                <StopIcon fontSize="large" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Start Recording">
            <span>
              <IconButton size="large" onClick={startRecording} disabled={isRecording}>
                <PlayArrowIcon fontSize="large" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Reset">
            <span>
              <IconButton size="large" onClick={resetRecording} disabled={isRecording || !videoSrc}>
                <RestartAltIcon fontSize="large" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
        <Divider />
        <Button variant="contained" fullWidth className="mt-5" onClick={handle}>Pupeteer Test</Button>
        <Button variant="contained" onClick={downloadVideo} disabled={!videoSrc} fullWidth className="mt-5">
          <DownloadIcon />&nbsp;
          Download Video
        </Button>
      </div>
    </div>
  );
}