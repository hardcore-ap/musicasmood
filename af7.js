document.addEventListener('DOMContentLoaded', function() {
    const locationInput = document.getElementById('location');
    const getWeatherBtn = document.getElementById('get-weather');
    const weatherDisplay = document.getElementById('weather-display');
    const moodSection = document.querySelector('.mood-section');
    const recommendations = document.getElementById('recommendations');
    const playlist = document.getElementById('playlist');
    
    // OpenWeatherMap API key (replace with your own)
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    
    // Mood and weather based playlists
    const playlists = {
        happy: {
            sunny: [
                { title: "Walking on Sunshine", artist: "Katrina and the Waves", cover: "https://i.scdn.co/image/ab67616d0000b273f2d2adaa21ad616df6241e7d" },
                { title: "Good Vibrations", artist: "The Beach Boys", cover: "https://i.scdn.co/image/ab67616d0000b2734a5b8578b9f6c7a7c9679c0b" },
                { title: "Happy", artist: "Pharrell Williams", cover: "https://i.scdn.co/image/ab67616d0000b2736f245fb1b3b9045a9c63072b" }
            ],
            rainy: [
                { title: "Singin' in the Rain", artist: "Gene Kelly", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Raindrops Keep Fallin' on My Head", artist: "B.J. Thomas", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Here Comes the Sun", artist: "The Beatles", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" }
            ],
            cloudy: [
                { title: "Don't Worry Be Happy", artist: "Bobby McFerrin", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Three Little Birds", artist: "Bob Marley", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "I Got You (I Feel Good)", artist: "James Brown", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" }
            ],
            snowy: [
                { title: "Winter Wonderland", artist: "Bing Crosby", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Let It Snow! Let It Snow! Let It Snow!", artist: "Dean Martin", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Frosty the Snowman", artist: "Gene Autry", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" }
            ]
        },
        relaxed: {
            sunny: [
                { title: "Island in the Sun", artist: "Weezer", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Banana Pancakes", artist: "Jack Johnson", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Sunflower", artist: "Post Malone, Swae Lee", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" }
            ],
            rainy: [
                { title: "Rain", artist: "The Beatles", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "No Rain", artist: "Blind Melon", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Riders on the Storm", artist: "The Doors", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" }
            ],
            cloudy: [
                { title: "Clouds", artist: "Joni Mitchell", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Breathe", artist: "Pink Floyd", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Dreams", artist: "Fleetwood Mac", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" }
            ],
            snowy: [
                { title: "Snow (Hey Oh)", artist: "Red Hot Chili Peppers", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "The Snows of New York", artist: "Van Morrison", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "First Snow", artist: "Emancipator", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" }
            ]
        },
        energetic: {
            sunny: [
                { title: "California Gurls", artist: "Katy Perry", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Surfin' U.S.A.", artist: "The Beach Boys", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Hot in Herre", artist: "Nelly", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" }
            ],
            rainy: [
                { title: "Thunderstruck", artist: "AC/DC", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Purple Rain", artist: "Prince", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Have You Ever Seen the Rain?", artist: "Creedence Clearwater Revival", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" }
            ],
            cloudy: [
                { title: "Eye of the Tiger", artist: "Survivor", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Lose Yourself", artist: "Eminem", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Jump", artist: "Van Halen", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" }
            ],
            snowy: [
                { title: "Cold as Ice", artist: "Foreigner", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Ice Ice Baby", artist: "Vanilla Ice", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Let It Go", artist: "Idina Menzel", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" }
            ]
        },
        melancholic: {
            sunny: [
                { title: "The Sound of Silence", artist: "Simon & Garfunkel", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Yesterday", artist: "The Beatles", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Hurt", artist: "Johnny Cash", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" }
            ],
            rainy: [
                { title: "November Rain", artist: "Guns N' Roses", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Set Fire to the Rain", artist: "Adele", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Blue Eyes Crying in the Rain", artist: "Willie Nelson", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" }
            ],
            cloudy: [
                { title: "Black Hole Sun", artist: "Soundgarden", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Behind Blue Eyes", artist: "The Who", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Mad World", artist: "Gary Jules", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" }
            ],
            snowy: [
                { title: "Snowblind", artist: "Black Sabbath", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "Cold", artist: "Annie Lennox", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" },
                { title: "The Blizzard", artist: "Hank Williams Jr.", cover: "https://i.scdn.co/image/ab67616d0000b273d5f3739fca9f6a8a9f6a1b0f" }
            ]
        }
    };
    
    let currentWeather = '';
    
    // Get weather data
    getWeatherBtn.addEventListener('click', function() {
        const location = locationInput.value.trim();
        
        if (!location) {
            alert('Please enter a location');
            return;
        }
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
                moodSection.classList.remove('hidden');
            })
            .catch(error => {
                alert(error.message);
                console.error('Error:', error);
            });
    });
    
    // Display weather data
    function displayWeather(data) {
        const cityName = document.getElementById('city-name');
        const temperature = document.getElementById('temperature');
        const weatherDescription = document.getElementById('weather-description');
        const weatherIcon = document.getElementById('weather-icon');
        
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        
        // Set weather icon
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = data.weather[0].main;
        
        // Determine weather type for playlist selection
        const weatherMain = data.weather[0].main.toLowerCase();
        if (weatherMain.includes('rain')) {
            currentWeather = 'rainy';
        } else if (weatherMain.includes('cloud')) {
            currentWeather = 'cloudy';
        } else if (weatherMain.includes('snow')) {
            currentWeather = 'snowy';
        } else {
            currentWeather = 'sunny';
        }
        
        weatherDisplay.classList.remove('hidden');
    }
    
    // Mood selection
    const moodButtons = document.querySelectorAll('.mood-btn');
    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            moodButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected mood
            const selectedMood = this.dataset.mood;
            
            // Generate playlist based on mood and weather
            generatePlaylist(selectedMood, currentWeather);
        });
    });
    
    // Generate playlist
    function generatePlaylist(mood, weather) {
        // Clear previous playlist
        playlist.innerHTML = '';
        
        // Get songs for current mood and weather
        const songs = playlists[mood][weather];
        
        // Display each song
        songs.forEach(song => {
            const songElement = document.createElement('div');
            songElement.className = 'song';
            songElement.innerHTML = `
                <img src="${song.cover}" alt="${song.title}">
                <div class="song-info">
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                </div>
            `;
            playlist.appendChild(songElement);
        });
        
        // Show recommendations
        recommendations.classList.remove('hidden');
    }
});
