export interface Project {
    id?: string;
    name: string;
    img: string;
    github_url: string;
    hosted_url: string;
    description: string;
    color: string;
    sort_order?: number;
}

export const projects: Project[] = [
    {
        name: "FireChat",
        img: "https://raw.githubusercontent.com/akash-kamat/firechat/master/pic2.png",
        github_url: "https://github.com/akash-kamat/firechat",
        hosted_url: "https://akash-kamat.github.io/firechat",
        description: "A google authenticated public chat-app (made using firebase)",
        color: "#e0814c"
    },
    {
        name: "AniChar",
        img: "https://i.ibb.co/Z8w7rx0/anichar3.jpg",
        github_url: "https://github.com/akash-kamat/anichar",
        hosted_url: "https://akash-kamat.github.io/anichar",
        description: "An authenticated MERN stack webapp to find new Anime characters and add them to your list!",
        color: "#688bbf"
    },
    {
        name: "CaptureIt",
        img: "https://raw.githubusercontent.com/akash-kamat/captureIt/main/Captureit.PNG",
        github_url: "https://github.com/akash-kamat/captureIt",
        hosted_url: "https://akash-kamat.github.io/captureIt/",
        description: "Capture screenshot of any webpage from its URL (Flash Api)",
        color: "#d072c6"
    },
    {
        name: "Aim Labs (ultra lite)",
        img: "https://i.ibb.co/020LPXC/aimlab1.png",
        github_url: "https://github.com/akash-kamat/Aim-Labs-pureJS",
        hosted_url: "https://akash-kamat.github.io/Aim-Labs-pureJS/",
        description: "WebGame to test AIM/reaction time made with pure JavaScript",
        color: "#81d985"
    },
    {
        name: "Confus",
        img: "https://github.com/akash-kamat/confus-frontend/raw/main/Screenshot%20from%202022-06-18%2018-51-30.png?raw=true",
        github_url: "https://github.com/akash-kamat/firechat",
        hosted_url: "https://confus.netlify.app/",
        description: "Full stack MERN webapp to post confessions anonymously",
        color: "#434343"
    },
    {
        name: "Memer",
        img: "https://i.ibb.co/KGWYJ3s/memer01.png",
        github_url: "https://github.com/akash-kamat/Memer",
        hosted_url: "https://akash-kamat.github.io/Memer/",
        description: "A 'not so impressive' Meme generator from templates fetched from an API, made using react",
        color: "#68bfbf"
    },
    {
        name: "To-Do",
        img: "https://i.ibb.co/5YV6fjt/todo1.png",
        github_url: "https://github.com/akash-kamat/todoapp",
        hosted_url: "https://akash-kamat.github.io/todoapp",
        description: "Minimal todo webapp made using Js and utilising localstorage",
        color: "#9176ba"
    },
    {
        name: "Pokedex",
        img: "https://i.ibb.co/V9tNwVT/pokedex.png",
        github_url: "https://github.com/akash-kamat/Pokedex",
        hosted_url: "https://akash-kamat.github.io/Pokedex/",
        description: "Simple pokedex using pokeApi and also my first react app",
        color: "#68bfbf"
    },
    {
        name: "Bored",
        img: "https://i.ibb.co/b5C7J7M/bored1.png",
        github_url: "https://github.com/akash-kamat/Bored",
        hosted_url: "https://akash-kamat.github.io/Bored",
        description: "bored?",
        color: "#d76565"
    }
];
