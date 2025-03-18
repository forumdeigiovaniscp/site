document.addEventListener('DOMContentLoaded', function() {
    // Get the Instagram feed container
    const instagramFeed = document.getElementById('instagram-feed');
    
    // Instagram API configuration
    const accessToken = 'IGAAQF5ZBWkrlJBZAE5VZAXB6em8weWtkV001bElmZADM2Ym0tM2pnSTFxZAkdZAenI0TGsyZAFcxZA2JWRHNxOEg1S3FqanBrcFZAWR2hhX2ptYjRVd0t3ZATRIQXVqQkZA4azlnRXA4SjR4eXlZAS0NLbGlRRHJiWXZAQMjlFZAEJjQjJ4TXRiWQZDZD'; // Replace with your Instagram access token
    const userId = '17841402088057740'; // Replace with your Instagram user ID
    
    // Function to load Instagram posts
    function loadInstagramFeed() {
        // Fetch data from Instagram API
        fetch(`https://graph.instagram.com/${userId}/media?access_token=${accessToken}&fields=media_url,permalink,caption`)
            .then(response => response.json())
            .then(data => {
                // Clear existing content
                instagramFeed.innerHTML = '';
                
                // Process each post
                data.data.forEach(post => {
                    // Create gallery item container
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    
                    // Create image element
                    const img = document.createElement('img');
                    img.src = post.media_url;
                    img.alt = 'Instagram Post';
                    
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
                    
                    // Append elements
                    overlay.appendChild(caption);
                    overlay.appendChild(link);
                    galleryItem.appendChild(img);
                    galleryItem.appendChild(overlay);
                    instagramFeed.appendChild(galleryItem);
                });
            })
            .catch(error => {
                console.error('Error fetching Instagram feed:', error);
                // Display error message or fallback content
                instagramFeed.innerHTML = `
                    <div class="error-message">
                        <p>Non è stato possibile caricare il feed Instagram. Si prega di riprovare più tardi.</p>
                    </div>
                `;
            });
    }
    
    // Function to simulate Instagram feed if API is not available
    function simulateInstagramFeed() {
        // Sample data for testing
        const samplePosts = [
            {
                media_url: '/api/placeholder/400/400',
                caption: 'Workshop di fotografia con i giovani del forum. Un'esperienza incredibile!',
                permalink: '#'
            },
            {
                media_url: '/api/placeholder/400/400',
                caption: 'Giornata ecologica nel nostro comune. Grazie a tutti i partecipanti!',
                permalink: '#'
            },
            {
                media_url: '/api/placeholder/400/400',
                caption: 'Riunione mensile del Forum dei Giovani. Tante nuove idee in arrivo!',
                permalink: '#'
            },
            {
                media_url: '/api/placeholder/400/400',
                caption: 'Escursione sui monti Picentini. Scopriamo la bellezza del nostro territorio.',
                permalink: '#'
            },
            {
                media_url: '/api/placeholder/400/400',
                caption: 'Assemblea annuale del Forum. Bilancio positivo e nuovi progetti.',
                permalink: '#'
            },
            {
                media_url: '/api/placeholder/400/400',
                caption: 'Incontro con le scuole per parlare di partecipazione giovanile.',
                permalink: '#'
            }
        ];
        
        // Clear existing content
        instagramFeed.innerHTML = '';
        
        // Create gallery items
        samplePosts.forEach(post => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = post.media_url;
            img.alt = 'Instagram Post';
            
            const overlay = document.createElement('div');
            overlay.className = 'gallery-overlay';
            
            const caption = document.createElement('p');
            caption.textContent = post.caption;
            
            overlay.appendChild(caption);
            galleryItem.appendChild(img);
            galleryItem.appendChild(overlay);
            instagramFeed.appendChild(galleryItem);
        });
    }
    
    // Try to load Instagram feed, fall back to simulation if API token is not set
    if (accessToken === '____') {
        // API token not set, use simulation
        simulateInstagramFeed();
    } else {
        // API token set, try to load real feed
        loadInstagramFeed();
    }
});