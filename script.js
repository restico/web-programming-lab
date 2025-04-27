const systemInfo = {
    appName: navigator.appName,
    appVersion: navigator.appVersion,
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    language: navigator.language
};
localStorage.setItem('systemInfo', JSON.stringify(systemInfo));

const footer = document.getElementById('footer-info');
const info = JSON.parse(localStorage.getItem('systemInfo'));
footer.innerHTML = `
    <div>App Name: ${info.appName}</div>
    <div>App Version: ${info.appVersion}</div>
    <div>Platform: ${info.platform}</div>
    <div>User Agent: ${info.userAgent}</div>
    <div>Language: ${info.language}</div>
`;

fetch('https://jsonplaceholder.typicode.com/posts/6/comments')
    .then(response => response.json())
    .then(comments => {
        const commentsContainer = document.createElement('div');
        commentsContainer.style.marginTop = '30px';
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.style.border = '1px solid #ccc';
            commentDiv.style.padding = '10px';
            commentDiv.style.margin = '10px 0';
            commentDiv.innerHTML = `<strong>${comment.name}</strong><br>${comment.body}`;
            commentsContainer.appendChild(commentDiv);
        });
        document.body.appendChild(commentsContainer);
    })
    .catch(error => console.error('Error fetching comments:', error));

setTimeout(() => {
    document.getElementById('feedback-modal').style.display = 'flex';
}, 60000);

document.querySelector('.close').onclick = function() {
    document.getElementById('feedback-modal').style.display = 'none';
};

const toggleButton = document.getElementById('theme-toggle');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('night-theme');
    document.body.classList.toggle('day-theme');
});

function setThemeBasedOnTime() {
    const hour = new Date().getHours();
    if (hour >= 7 && hour < 21) {
        document.body.classList.add('day-theme');
    } else {
        document.body.classList.add('night-theme');
    }
}

setThemeBasedOnTime();
