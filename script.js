document.addEventListener('DOMContentLoaded', function() {
    const instagramFeed = document.getElementById('instagram-feed');

    // Sostituisci con il tuo token di accesso e l'ID utente
    const accessToken = 'IGAAQF5ZBWkrlJBZAE5VZAXB6em8weWtkV001bElmZADM2Ym0tM2pnSTFxZAkdZAenI0TGsyZAFcxZA2JWRHNxOEg1S3FqanBrcFZAWR2hhX2ptYjRVd0t3ZATRIQXVqQkZA4azlnRXA4SjR4eXlZAS0NLbGlRRHJiWXZAQMjlFZAEJjQjJ4TXRiWQZDZD';
    const userId = '17841402088057740';

    fetch(`https://graph.instagram.com/${userId}/media?access_token=${accessToken}&fields=media_url,permalink`)
        .then(response => response.json())
        .then(data => {
            data.data.forEach(post => {
                const img = document.createElement('img');
                img.src = post.media_url;
                img.alt = 'Instagram Post';
                instagramFeed.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching Instagram feed:', error));
});