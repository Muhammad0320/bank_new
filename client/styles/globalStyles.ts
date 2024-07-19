'use client';

// https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository

// https://documenter.getpostman.com/view/29178674/2s9YJgTfzH

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

@property --gradient-angle {

syntax: "<angle>";
initial-value: 0deg;
inherits: false;

};

:root {


    --hue: 76;
    --saturation: 100%;
    --lightness: 60%;

    --g-saturation: 67%;
    --g-lightness: 36%;

    --primary-gradient:  linear-gradient( 145deg, hsl( var(--hue) var(--saturation) var(--lightness) ), hsl( var(--hue) var(--g-saturation) var(--g-lightness) /.9 )  ) ;  
     
    --primary-color:  hsl(var(--hue) var(--saturation) var(--lightness) );

    /* --accent-color: hsl(var(--hue), var(--saturation), var(--lightness));

    
    --bg-color:  hsl(var(--hue), var(--saturation), var(--lightness)); */
    --text-color: hsl(280, 6%, 90%);
    --text-color-dark: hsl(280, 6%, 70%);
    --card-color: hsl(0, 0%, 15%);
    --border-color: hsl(0, 0%, 15%);
  
    --black-color: hsl(0, 0%, 10% ) ;
    --black-color-light: hsl(0, 0%, 20%);
      
    --color-red-light: #e5383b; 
    --color-red-dark: #da1e37;

  

    /* --color-dark: #000;
    --color-dark-1: #101010;
    --color-dark-2:  rgba(0, 0, 0, 0.2);
    --color-dark-3:  rgba(0, 0, 0, 0.8);
    --color-dark-4:  rgba(0, 0, 0, 0.5); */
    

    
    --color-white: #fff ;
    --color-white-1: #fafafa;
    --color-white-2: #f1f1f1 ;
    --color-white-3: rgba(255, 255, 255, .3);

    --color-gradient-dark: linear-gradient(145deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .25));
    --color-gradient-dark-muted: linear-gradient(145deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .10));
    --color-gradient-dark-1: linear-gradient(145deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .50));
    --color-gradient-light: linear-gradient(145deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, .25));
      
    /* --color-white-vivid: color-mix(in oklab, var(--color-primary-light) 10%, var(--color-white));
    --color-primary-muted: color-mix(in oklab, var(--color-primary) 80%, var(--color-white));
    --color-primary-dark: color-mix(in oklab, var(--color-primary) 80%, var(--color-dark));
    --color-primary-light-muted: color-mix(in oklab, var(--color-primary-light) 30%, var(--color-white));
    --color-primary-light-dark: color-mix(in oklab, var(--color-primary-light) 80%, var(--color-dark)); */


    --box-shadow-light: 0 5px 5px 2px rgba(16, 16, 16, 0.2); 

    --box-shadow-light-2: 0 5px 5px 3px rgba(16, 16, 16, 0.1); 
    --box-shadow-dark: 0 5px 10px 6px rgba(16, 16, 16, 0.3); 
    --box-shadow-dark-2: 0 5px 8px 4px rgba(16, 16, 16, 0.25); 

    --box-shadow-button:  2.5px 2.5px 1px ;

    /* --text-shadow: 
    -0.5px -1px  1px var(--color-primary-muted),
    -0.5px -2px  1px var(--color-primary-light-dark),
    -1px -3px  2px var(--color-white); */




} 


/* ::-webkit-scrollbar-thumb {
  
  background: var( --color-primary-muted ); 

  background-image: var(--color-gradient-dark);

  transition: background-color .2s ease ;
  border-radius: 100vw; 
  

  &:hover {

    background-color: var( --color-primary-light ); 
  background-image: var(--color-gradient-dark);



  }

}
  
::-webkit-scrollbar {
  
  width: 2.5rem;
  height: 1.5rem;


}


::-webkit-scrollbar-track {

  background-color: var(--color-dark-2); 

  margin-block: 1rem;
  
  
  border-radius: 100vw;

} */


  *,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}


html {
  font-size: 62.5%;
  scroll-behavior: smooth; 
  
  overflow: auto;
}



.flex-container {
 flex-grow: 1;


}





body {
  margin: 0;
  padding: 0;
  color: var(--text-color);
  transition: color 0.3s, background-color 0.3s;
  background-color: var(--color-white-1);
  min-height: 100dvh;
  max-width: 100dvw;
  overflow-x: hidden;
  line-height: 1.5;
  font-size: 1.5rem;
  box-sizing: border-box;
}

input,
textarea,
button{
  font: inherit;
  color: inherit;
}




button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
  background-color: var(--card-color) ;

}


input:disabled {
  background-color: var(--card-color);
  color: var(--text-color);
}



button:has(svg) {
  line-height: 0;
}


input:focus,
button:focus,
textarea:focus,
select:focus {

  --lightness: 20%;
  outline: 2px solid var(--primary-color);
  outline-offset: -1px;
}



a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  overflow-wrap: break-word;

}

img {
  max-width: 100%;
  border-radius: 1rem;
 
};


img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}



`;

export default GlobalStyles;
