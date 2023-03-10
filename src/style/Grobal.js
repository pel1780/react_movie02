import { createGlobalStyle } from "styled-components";

const Reset = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Roboto:wght@100;300;400;500;700;900&display=swap');

*{
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-weight: inherit;
    box-sizing: border-box;
    color: inherit;
}

*::before,
*::after {
    box-sizing: border-box;
}

ul,
ol {
    list-style: none;
}

em,
i,
address {
    font-style: normal;
}

b,
strong {
    font-weight: normal;
}

a {
    text-decoration: none;
}

img {
    vertical-align: middle;
    max-width: 100%;
}

body {
    line-height: 1;
    color: #444;
    font-family: 'Roboto', 'Noto Sans KR', sans-serif;
}
`

export default Reset;