document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsContainer = document.getElementById('reviews');
  
    reviewForm.addEventListener('submit', e => {
      e.preventDefault();
  
      const titleInput = document.getElementById('title');
      const bodyInput = document.getElementById('body');
      const ratingInput = document.getElementById('rating');
  
      const title = titleInput.value;
      const body = bodyInput.value;
      const rating = ratingInput.value;
  
      
      titleInput.value = '';
      bodyInput.value = '';
      ratingInput.value = '';
  
      const review = {
        title,
        body,
        rating
      };
  
      fetch('http://localhost:5500/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log(data); 
        fetchReviews();
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
    });
  
    
    function fetchReviews() {
      fetch('http://localhost:5500/api/reviews')
        .then(response => {
          if (!response.ok) {
            throw new Error('Error: ' + response.status);
          }
          return response.json();
        })
        .then(reviews => {
          reviewsContainer.innerHTML = '';
          reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.innerHTML = `
              <h3>${review.title}</h3>
              <p>${review.body}</p>
              <p>Rating: ${review.rating}</p>
            `;
            reviewsContainer.appendChild(reviewElement);
          });
        })
        .catch(error => {
          console.error('An error occurred:', error);
        });
    }
  
    fetchReviews();
  });
  