document.addEventListener('DOMContentLoaded', function() {
    // Get the Instagram feed container
    const instagramFeed = document.getElementById('instagram-feed');
    
    // Instagram API configuration
    const accessToken = 'IGAAQF5ZBWkrlJBZAE5VZAXB6em8weWtkV001bElmZADM2Ym0tM2pnSTFxZAkdZAenI0TGsyZAFcxZA2JWRHNxOEg1S3FqanBrcFZAWR2hhX2ptYjRVd0t3ZATRIQXVqQkZA4azlnRXA4SjR4eXlZAS0NLbGlRRHJiWXZAQMjlFZAEJjQjJ4TXRiWQZDZD'; // Replace with your Instagram access token
    const userId = '17841402088057740'; // Replace with your Instagram user ID
    
    // Function to load Instagram posts
    function loadInstagramFeed() {
        // Fetch data from Instagram API - add media_type to the fields
        fetch(`https://graph.instagram.com/${userId}/media?access_token=${accessToken}&fields=media_url,permalink,caption,media_type,thumbnail_url`)
            .then(response => response.json())
            .then(data => {
                // Clear existing content
                instagramFeed.innerHTML = '';
                
                // Show only first 3 posts initially
                const initialDisplayCount = 3;
                let currentlyShown = initialDisplayCount;
                jumped = 0;

                // Process each post
                data.data.forEach((post, index) => {
                    // Create gallery item container
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    
                    // Hide posts beyond the initial count
                    if (index >= initialDisplayCount + jumped) {
                        galleryItem.classList.add('hidden-post');
                        galleryItem.style.display = 'none';
                    }
                    
                    // Check if the post is a video or image
                    if (post.media_type === 'VIDEO') {

                        /*
                        
                        // Create video element
                        const video = document.createElement('video');
                        video.src = post.media_url;
                        video.controls = true;
                        video.muted = true;
                        video.loop = true;
                        video.preload = 'metadata';
                        
                        // Use thumbnail as poster if available
                        if (post.thumbnail_url) {
                            video.poster = post.thumbnail_url;
                        }
                        
                        // Add play button overlay
                        const playButton = document.createElement('div');
                        playButton.className = 'video-play-button';
                        playButton.innerHTML = '<i class="fa fa-play"></i>';
                        
                        // Handle play button click
                        playButton.addEventListener('click', function() {
                            if (video.paused) {
                                video.play();
                                this.style.display = 'none';
                            } else {
                                video.pause();
                                this.style.display = 'flex';
                            }
                        });
                        
                        // Add video event listeners
                        video.addEventListener('play', function() {
                            playButton.style.display = 'none';
                        });
                        
                        video.addEventListener('pause', function() {
                            playButton.style.display = 'flex';
                        });
                        
                        galleryItem.appendChild(video);
                        galleryItem.appendChild(playButton);
                        */
                       console.log("skipped video");
                       jumped += 1;
                    } else {
                        // Create image element for non-video posts
                        const img = document.createElement('img');
                        img.src = post.media_url;
                        img.alt = 'Instagram Post';
                        galleryItem.appendChild(img);
                    }
                    
                    // Create caption overlay
                    const overlay = document.createElement('div');
                    overlay.className = 'gallery-overlay';
                    
                    // Create caption text
                    const caption = document.createElement('p');
                    caption.textContent = post.caption ? post.caption : 'Forum dei Giovani San Cipriano';
                    
                    // Create link to original post
                    const link = document.createElement('a');
                    link.href = post.permalink;
                    link.target = '_blank';
                    link.textContent = 'Visualizza su Instagram';
                    link.className = 'instagram-link';
                    
                    // Add media type indicator
                    if (post.media_type === 'VIDEO') {
                        const mediaTypeIndicator = document.createElement('span');
                        mediaTypeIndicator.className = 'media-type-indicator';
                        mediaTypeIndicator.textContent = 'Video';
                        overlay.appendChild(mediaTypeIndicator);
                    }
                    
                    // Append elements
                    overlay.appendChild(caption);
                    overlay.appendChild(link);
                    galleryItem.appendChild(overlay);
                    instagramFeed.appendChild(galleryItem);
                });
                
                // Add "Show more" button if there are more than 3 posts
                if (data.data.length > initialDisplayCount) {
                    const loadMoreContainer = document.createElement('div');
                    loadMoreContainer.className = 'load-more-container';
                    
                    const loadMoreBtn = document.createElement('button');
                    loadMoreBtn.className = 'btn load-more-btn';
                    loadMoreBtn.textContent = 'Mostra di più';
                    
                    loadMoreBtn.addEventListener('click', function() {
                        const hiddenPosts = document.querySelectorAll('.hidden-post');
                        
                        // Show the next 6 posts (or whatever remains)
                        let counter = 0;
                        hiddenPosts.forEach(post => {
                            if (post.style.display === 'none' && counter < 6) {
                                post.style.display = '';
                                counter++;
                                currentlyShown++;
                            }
                        });
                        
                        // If all posts are now visible, change button to redirect to Instagram
                        if (currentlyShown >= data.data.length) {
                            loadMoreBtn.textContent = 'Vedi tutti su Instagram';
                            loadMoreBtn.addEventListener('click', function() {
                                window.open('https://www.instagram.com/', '_blank');
                            }, { once: true });
                        }
                    });
                    
                    loadMoreContainer.appendChild(loadMoreBtn);
                    instagramFeed.parentNode.appendChild(loadMoreContainer);
                }
            })
            .catch(error => {
                console.error('Error fetching Instagram feed:', error);
                // Display error message or fallback content
                instagramFeed.innerHTML = `
                    <div class="error-message">
                        <p>Non è stato possibile caricare il feed Instagram. Si prega di riprovare più tardi.</p>
                    </div>
                `;
                
                // Create placeholder posts
                createPlaceholderPosts();
            });
    }
    
    // Function to create placeholder posts when the API fails
    function createPlaceholderPosts() {
        const posts = [
            { caption: "Evento di discussione pubblica", isVideo: false },
            { caption: "Attività con i giovani del territorio", isVideo: true },
            { caption: "Incontro con le autorità locali", isVideo: false },
            { caption: "Workshop formativo per i giovani", isVideo: true },
            { caption: "Evento culturale a San Cipriano", isVideo: false },
            { caption: "Iniziativa ambientale", isVideo: false }
        ];
        
        instagramFeed.innerHTML = '';
        
        // Show only first 3 posts initially
        const initialDisplayCount = 3;
        let currentlyShown = initialDisplayCount;
        
        posts.forEach((post, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            // Hide posts beyond the initial count
            if (index >= initialDisplayCount) {
                galleryItem.classList.add('hidden-post');
                galleryItem.style.display = 'none';
            }
            
            if (post.isVideo) {
                // Create video placeholder
                const videoPlaceholder = document.createElement('div');
                videoPlaceholder.className = 'video-placeholder';
                
                const img = document.createElement('img');
                img.src = "/api/placeholder/400/400";
                img.alt = 'Forum dei Giovani video';
                
                const playIcon = document.createElement('div');
                playIcon.className = 'play-icon';
                playIcon.innerHTML = '<i class="fa fa-play"></i>';
                
                videoPlaceholder.appendChild(img);
                videoPlaceholder.appendChild(playIcon);
                galleryItem.appendChild(videoPlaceholder);
            } else {
                const img = document.createElement('img');
                img.src = "/api/placeholder/400/400";
                img.alt = 'Forum dei Giovani post';
                galleryItem.appendChild(img);
            }
            
            const overlay = document.createElement('div');
            overlay.className = 'gallery-overlay';
            
            const caption = document.createElement('p');
            caption.textContent = post.caption;
            
            // Add media type indicator for videos
            if (post.isVideo) {
                const mediaTypeIndicator = document.createElement('span');
                mediaTypeIndicator.className = 'media-type-indicator';
                mediaTypeIndicator.textContent = 'Video';
                overlay.appendChild(mediaTypeIndicator);
            }
            
            overlay.appendChild(caption);
            galleryItem.appendChild(overlay);
            instagramFeed.appendChild(galleryItem);
        });
        
        // Add "Show more" button if there are more than 3 posts
        if (posts.length > initialDisplayCount) {
            const loadMoreContainer = document.createElement('div');
            loadMoreContainer.className = 'load-more-container';
            
            const loadMoreBtn = document.createElement('button');
            loadMoreBtn.className = 'btn load-more-btn';
            loadMoreBtn.textContent = 'Mostra di più';
            
            loadMoreBtn.addEventListener('click', function() {
                const hiddenPosts = document.querySelectorAll('.hidden-post');
                
                // Show the next 6 posts (or whatever remains)
                let counter = 0;
                hiddenPosts.forEach(post => {
                    if (post.style.display === 'none' && counter < 6) {
                        post.style.display = '';
                        counter++;
                        currentlyShown++;
                    }
                });
                
                // If all posts are now visible, change button to redirect to Instagram
                if (currentlyShown >= posts.length) {
                    loadMoreBtn.textContent = 'Vedi tutti su Instagram';
                    loadMoreBtn.addEventListener('click', function() {
                        window.open('https://www.instagram.com/', '_blank');
                    }, { once: true });
                }
            });
            
            loadMoreContainer.appendChild(loadMoreBtn);
            instagramFeed.parentNode.appendChild(loadMoreContainer);
        }
    }
    
    // Try to load Instagram feed, fallback to placeholder if fails
    loadInstagramFeed();

    // Rest of the code (menu functionality) remains unchanged
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    if (menuToggle) {
        // Ensure menu toggle works correctly
        menuToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.style.overflow = 'hidden';
                mainNav.classList.add('active');
            } else {
                document.body.style.overflow = '';
                mainNav.classList.remove('active');
            }
        });
        
        // Close menu when clicking on navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (menuToggle.checked) {
                    menuToggle.checked = false;
                    document.body.style.overflow = '';
                    mainNav.classList.remove('active');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (menuToggle.checked && 
                !event.target.closest('.main-nav') && 
                !event.target.closest('.menu-icon') &&
                !event.target.closest('#menu-toggle')) {
                menuToggle.checked = false;
                document.body.style.overflow = '';
                mainNav.classList.remove('active');
            }
        });
    }
    
    // Handle resize events
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && menuToggle && menuToggle.checked) {
            menuToggle.checked = false;
            document.body.style.overflow = '';
            mainNav.classList.remove('active');
        }
    });
});