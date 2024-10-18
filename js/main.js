const video = document.getElementById('video-player'),
      modal = document.getElementById('modal'),
      repeat = document.getElementById('repeat-button'),
      progress = document.getElementById('video-progress'),
      playBTN = document.getElementById('play-button'),
      videoTitle = document.getElementById('video-title'),
      nextBtns = [document.getElementById('next-video'), document.getElementById('next-two-video'), document.getElementById('next-three-video')],
      iniciarBtn = document.querySelector('[href="#iniciar"]');

const videos = [
    { src: 'assets/videos/video_1.mp4', title: '¿Qué es un Fondo de Inversión?', relates: [
        { src: 'assets/videos/video_2.mp4', title: '¿Qué es un Fondo Abierto?' },
        { src: 'assets/videos/video_3.mp4', title: 'Diferencia entre Puesto de Bolsa y SAFI' },
        { src: 'assets/videos/video_4.mp4', title: '¿Por qué invertir en un Fondo Abierto?' },
    ]},
    { src: 'assets/videos/video_2.mp4', title: '¿Qué es un Fondo Abierto?', relates: [
        { src: 'assets/videos/video_3.mp4', title: 'Diferencia entre Puesto de Bolsa y SAFI' },
        { src: 'assets/videos/video_4.mp4', title: '¿Por qué invertir en un Fondo Abierto?' },
        { src: 'assets/videos/video_1.mp4', title: '¿Qué es un Fondo de Inversión?' },
    ]},
    { src: 'assets/videos/video_3.mp4', title: 'Diferencia entre Puesto de Bolsa y SAFI', relates: [
        { src: 'assets/videos/video_4.mp4', title: '¿Por qué invertir en un Fondo Abierto?' },
        { src: 'assets/videos/video_1.mp4', title: '¿Qué es un Fondo de Inversión?' },
        { src: 'assets/videos/video_2.mp4', title: '¿Qué es un Fondo Abierto?' },
    ]},
    { src: 'assets/videos/video_4.mp4', title: '¿Por qué invertir en un Fondo Abierto?', relates: [
        { src: 'assets/videos/video_1.mp4', title: '¿Qué es un Fondo de Inversión?' },
        { src: 'assets/videos/video_2.mp4', title: '¿Qué es un Fondo Abierto?' },
        { src: 'assets/videos/video_3.mp4', title: 'Diferencia entre Puesto de Bolsa y SAFI' },
    ]}
];

let currentVideo = videos[0];

function isInViewPort(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

function playVideo() {
    if (!modal.classList.contains('active') && !video.dataset.hasBeenPlayed) {
        video.play();
        video.muted = false;
    }
}

function updateProgress() {
    progress.style.width = `${(video.currentTime / video.duration) * 100}%`;
}

function loadVideo(index) {
    currentVideo = videos[index];
    video.src = currentVideo.src;
    videoTitle.textContent = currentVideo.title;
    nextBtns.forEach((btn, i) => btn.textContent = currentVideo.relates[i].title);
    video.dataset.hasBeenPlayed = false;
    modal.classList.remove('active');
    video.play();
}

video.addEventListener('timeupdate', updateProgress);
window.addEventListener('scroll', () => isInViewPort(video) && playVideo());

repeat.addEventListener('click', () => {
    modal.classList.remove('active');
    video.play();
});

video.addEventListener('ended', () => {
    modal.classList.add('active');
    video.currentTime = 0;
    video.pause();
});

playBTN.addEventListener('click', () => {
    video.dataset.hasBeenPlayed = true;
    video.paused ? video.play() : video.pause();
});

nextBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => loadVideo((videos.indexOf(currentVideo) + i + 1) % videos.length));
});

iniciarBtn?.addEventListener('click', playVideo);
