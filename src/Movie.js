import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";

import CommonStyle from "./style/Global";

const Wrapper = styled.div`
background: #474544;
`
const MovieListWrapper = styled.section`
padding: 100px 0;
`
const Inner = styled.div`
width: 1600px;
margin: 0 auto;
`
const GridLayout = styled.ul`
display: grid;
grid-template-columns: repeat(6, 1fr);
gap: 10px;
`
const GridItm = styled.li`
position: relative;
`
const Img = styled.img`

`
const Title = styled.strong`
position: absolute;
inset: 20px 20px auto 20px;
color: #fff;
`
const Desc = styled.p`
position: absolute;
inset: auto 0 0 0;
color: #fff;
background: rgba(0, 0, 0, 0.5);
padding: 20px;
font-size: 12px;
font-weight: 300;
line-height: 1.4;
min-height: 120px;
`
const Header = styled.header`
padding: 50px 0;
text-align: center;
`
const H1 = styled.h1`
font-size: 80px;
font-weight: 900;
color: #ffa556;
margin-bottom: 20px;
`
const MainTit = styled.p`
margin-bottom: 30px;
text-transform: uppercase;
font-size: 15px;
color: #fff;
`
const Input = styled.input`
border: none;
outline: none;
border: 1px solid #ddd;
font-size: 14px;
padding: 5px;
width: 300px;
`
const Button = styled.button`
border: none;
outline: none;
background: #ffa556;
color: #fff;
padding: 5px 20px;
margin: 0 0 0 10px;
text-transform: uppercase;
`
const ListBtnWrapper = styled.div`
text-align: center;
`
const ListBtn = styled.button`
border: none;
outline: none;
padding: 3px 10px;
margin: 0 1px;
background: #ffa556;
color: #fff;
border-radius: 2px;
`
const MoviePopWrapper = styled.div`
position: fixed;
inset: 0 0 0 0;
background: rgba(0, 0, 0, 0.5);
z-index: 99;
`
const MoviePop = styled.div`
position: absolute;
inset: 50% auto auto 50%;
transform: translate(-50%, -50%);
`


const DetailMovie = ({ movie, on, setOn }) => {
    const { id } = useParams();
    const detailMovie = movie.find(it => it.id == id);

    const wheelStop = e => {
        e.preventDefault();
    }
    const bg = useRef(null);

    useEffect(() => {
        bg.current.addEventListener('wheel', wheelStop)
    }, [id])

    return (
        <>
            {
                detailMovie && on &&
                <MoviePopWrapper
                    onClick={() => setOn(false)}
                    // onWheel={wheelStop}
                    ref={bg}
                >
                    <MoviePop>
                        <img src={detailMovie.large_cover_image} alt="" />
                    </MoviePop>
                </MoviePopWrapper>
            }
        </>
    )
};

const Movie = () => {
    const [movie, setMovie] = useState([]);
    const [movieList, setMovieList] = useState({});
    const [pageNum, setPageNum] = useState(0);
    const [list, setList] = useState(0);
    const [on, setOn] = useState(true);

    const limit = 48;
    const pageLimit = 20;
    const listNum = Array.from({ length: parseInt(movieList.movie_count / limit) });

    const getMovie = async () => {
        const r = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=${limit}&page=${pageNum}`);
        setMovieList(r.data.data);
        setMovie(r.data.data.movies)
    }

    useEffect(() => {
        getMovie();
    }, [pageNum]);

    console.log(movie, movieList);
    return (
        <Wrapper>
            <CommonStyle />
            <Header>
                <H1>KIM's MOVIE</H1>
                <MainTit>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, ea.</MainTit>
                <form action="">
                    <Input type="text" />
                    <Button>search</Button>
                </form>
            </Header>

            <Routes>
                <Route path="/" element={null} />
                <Route path="/detail/:id" element={<DetailMovie movie={movie} on={on} setOn={setOn} />} />
            </Routes>

            <ListBtnWrapper>
                {list > 1 &&
                    <ListBtn onClick={() => setList(list - pageLimit)}>Prev</ListBtn>}
                {
                    listNum.map((_, idx) => {
                        return (
                            <ListBtn onClick={() => setPageNum(idx + 1)}>{idx + 1}</ListBtn>
                        )
                    }).slice(list, list + pageLimit)
                }
                {list < parseInt(movieList.movie_count / limit) - pageLimit &&
                    <ListBtn onClick={() => setList(list + pageLimit)}>Next</ListBtn>}
            </ListBtnWrapper>
            <MovieListWrapper>
                <Inner>
                    <GridLayout>
                        {
                            movie.map((it, idx) => {
                                return (
                                    <GridItm key={idx} onClick={() => setOn(true)}>
                                        <Link to={`./detail/${it.id}`}>
                                            <Img src={it.large_cover_image}
                                                alt={it.title}
                                                onError={e => e.target.src = `${process.env.PUBLIC_URL}/cover.jpg`}
                                            />
                                            {/* onError는 이미지가 없을때 대체이미지를 꾸려주는 것 */}
                                            <Title>{it.title}</Title>
                                            {it.description_full &&
                                                <Desc>
                                                    {it.description_full.substr(0, 150)}
                                                    {it.description_full.length > 150 ? '...' : ''}
                                                </Desc>
                                            }
                                            {/* substr은 글자갯수를 잘라주는 역할 */}
                                        </Link>
                                    </GridItm>
                                )
                            })
                        }
                    </GridLayout>
                </Inner>
            </MovieListWrapper>
        </Wrapper>
    )
}

export default Movie;