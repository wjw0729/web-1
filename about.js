document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', (e) => {
       
        e.preventDefault();

        
        const name = document.getElementById('name').value;
        const subject = document.getElementById('subject').value;
        
        const email = "1083205161@qq.com";

     
        const mailtoLink = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent("Hi, my name is " + name + ".");

     
        window.location.href = mailtoLink;

     
        alert("Your default email app is opening. Please click send!");
        form.reset();
    });
});