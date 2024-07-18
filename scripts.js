let currentUsername = "";

document.getElementById('loginButton').addEventListener('click', login);

function login() {
    const username = document.getElementById('username').value;

    if (username.trim() === "") {
        alert("Username cannot be empty");
        return;
    }

    currentUsername = username;

    document.getElementById('profileName').textContent = username;
    document.getElementById('profileNameSidebar').textContent = username;

    document.getElementById('loginContent').classList.add('hidden');
    showHome();
}

document.getElementById('postButton').addEventListener('click', createPost);

function createPost() {
    const postContent = document.getElementById('postContent').value;

    if (postContent.trim() === "") {
        alert("Post content cannot be empty");
        return;
    }

    const postElement = createPostElement(postContent, currentUsername, false);
    document.getElementById('postsContainer').prepend(postElement);

    const profilePostElement = createPostElement(postContent, currentUsername, true);
    document.getElementById('profilePostsContainer').prepend(profilePostElement);

    document.getElementById('postContent').value = "";
}

function createPostElement(content, username, showDeleteButton) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const profileContainer = document.createElement('div');
    profileContainer.classList.add('profile-container');

    const profilePic = document.createElement('img');
    profilePic.src = 'profile-pic.jpg';  // Gambar profil default
    profilePic.alt = 'Profile Picture';
    profilePic.classList.add('profile-pic-small');

    const postUser = document.createElement('h4');
    postUser.textContent = username;

    profileContainer.appendChild(profilePic);
    profileContainer.appendChild(postUser);

    const postText = document.createElement('p');
    postText.textContent = content;

    const likeButton = document.createElement('img');
    likeButton.src = 'like-icon.png';  // Ganti dengan URL gambar Like
    likeButton.alt = 'Like';
    likeButton.classList.add('like-button');
    likeButton.style.cursor = 'pointer';

    const likesCount = document.createElement('span');
    likesCount.textContent = '0';
    likesCount.classList.add('likes-count');

    likeButton.addEventListener('click', function() {
        const homePost = findMatchingPost(postText.textContent, username, document.getElementById('postsContainer'));
        const profilePost = findMatchingPost(postText.textContent, username, document.getElementById('profilePostsContainer'));

        if (likeButton.classList.contains('liked')) {
            likeButton.classList.remove('liked');
            likesCount.textContent = parseInt(likesCount.textContent) - 1;
        } else {
            likeButton.classList.add('liked');
            likesCount.textContent = parseInt(likesCount.textContent) + 1;
        }

        updateLikesCount(homePost, likesCount.textContent);
        updateLikesCount(profilePost, likesCount.textContent);
    });

    postElement.appendChild(profileContainer);
    postElement.appendChild(postText);
    postElement.appendChild(likeButton);
    postElement.appendChild(likesCount);

    if (showDeleteButton) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            postElement.remove();
            const homePosts = document.querySelectorAll('.post');
            homePosts.forEach(homePost => {
                if (homePost.querySelector('h4').textContent === username && 
                    homePost.querySelector('p').textContent === content) {
                    homePost.remove();
                }
            });
        });
        postElement.appendChild(deleteButton);
    }

    return postElement;
}

function findMatchingPost(content, username, container) {
    const posts = container.querySelectorAll('.post');
    return Array.from(posts).find(post => post.querySelector('p').textContent === content && post.querySelector('h4').textContent === username);
}

function updateLikesCount(post, count) {
    if (post) {
        post.querySelector('.likes-count').textContent = count;
    }
}

function showMessages() {
    hideAllContent();
    document.getElementById('messagesContent').classList.remove('hidden');
    document.getElementById('messagesBackButton').addEventListener('click', showHome);
}

function showFriends() {
    hideAllContent();
    document.getElementById('friendsContent').classList.remove('hidden');
    document.getElementById('friendsBackButton').addEventListener('click', showHome);
}

function showProfile() {
    hideAllContent();
    document.getElementById('profileContent').classList.remove('hidden');
}

function showHome() {
    hideAllContent();
    document.getElementById('homeContent').classList.remove('hidden');
}

function hideAllContent() {
    document.getElementById('homeContent').classList.add('hidden');
    document.getElementById('profileContent').classList.add('hidden');
    document.getElementById('messagesContent').classList.add('hidden');
    document.getElementById('friendsContent').classList.add('hidden');
}
