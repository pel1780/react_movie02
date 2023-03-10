import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";

import CommonStyle from "./style/Global";

import { BsArrowLeft, BsArrowRight, BsX } from "react-icons/bs";

import MovieSlide from 'react-slick';
import 'slick-carousel/slick/slick.css';

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
color: #fff;

display: grid;
grid-template-columns: repeat(2, 1fr);
background: #555;
width: 800px;
`
const MoviePopDesc = styled.div`
position: relative;
display: flex;
flex-direction: column;
padding: 50px;
`
const MoviePopDescTitle = styled.h3`
font-size: 24px;
font-weight: 700;
margin-bottom: 10px;
`
const MoviePopDescDesc = styled.p`
font-size: 14px;
font-weight: 300;
line-height: 1.4;
`
const MoviePopDescYear = styled.span`
font-size: 14px;
font-weight: 300;
line-height: 1.4;
margin: auto 0 10px 0;
`
const MoviePopDescGenres = styled.ul`
font-size: 14px;
font-weight: 500;
display: flex;
flex-wrap: wrap;
gap: 10px;
`
const Genre = styled.li`
`
const MoviePopClose = styled.span`
position: absolute;
inset: 0 0 auto auto;
font-size: 30px;
background: transparent;
border: none;
outline: none;
padding: 10px;
background: tomato;
`
const MovieSlideWrapper = styled.div`
position: relative;
color: #fff;
margin-bottom: 30px;
`
const MovieSlideLeftArrow = styled.span`
position: absolute;
inset: 50% auto auto 0;
transform: translate(0, -50%);
background: rgba(0, 0, 0, 0.5);
padding: 10px;
font-size: 30px;
`
const MovieSlideRightArrow = styled.span`
position: absolute;
inset: 50% 0 auto auto;
transform: translate(0, -50%);
background: rgba(0, 0, 0, 0.5);
padding: 10px;
font-size: 30px;
`


const DetailMovie = ({ movie, search, on, setOn }) => {
    const { id } = useParams();
    const detailMovie = movie.find(it => String(it.id) === id);

    const wheelStop = e => {
        e.preventDefault();
    }
    const bg = useRef(null);

    useEffect(() => {
        bg.current.addEventListener('wheel', wheelStop)
    }, [id.current])

    return (
        <>
            {
                detailMovie && on &&
                <MoviePopWrapper
                    // onWheel={wheelStop}
                    ref={bg}
                >
                    <MoviePop>
                        <div><img src={detailMovie.large_cover_image} alt="" /></div>
                        <MoviePopDesc>
                            <MoviePopDescTitle>{detailMovie.title}</MoviePopDescTitle>
                            <MoviePopDescDesc>{detailMovie.description_full.substr(0, 300)}</MoviePopDescDesc>
                            <MoviePopDescYear>{detailMovie.year}</MoviePopDescYear>
                            <MoviePopDescGenres>{detailMovie.genres?.map((it, idx) => <Genre key={idx}>{it}</Genre>)}</MoviePopDescGenres>
                            <MoviePopClose onClick={() => setOn(false)}><BsX /></MoviePopClose>
                        </MoviePopDesc>
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
    const MainSlide = useRef(null);
    const [search, setSearch] = useState([]);
    const [input, setInput] = useState(null);

    const limit = 48;
    const pageLimit = 20;
    const listNum = Array.from({ length: parseInt(movieList.movie_count / limit) });

    const getMovie = async () => {
        const r = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=${limit}&page=${pageNum}`);
        setMovieList(r.data.data);
        setMovie(r.data.data.movies);
    }
    const searchMovie = async () => {
        const r = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${input}`);
        setSearch(r.data.data.movies);
    }

    useEffect(() => {
        getMovie();
    }, [pageNum]);

    useEffect(() => {
        searchMovie();
    }, [input]);

    const searchHandler = e => {
        e.preventDefault();
    }

    console.log(movie, movieList);

    const MovieSlideOption = {
        slidesToShow: 8,
        arrows: false,
    }
    return (
        <Wrapper>
            <CommonStyle />
            <Header>
                <H1>KIM's MOVIE</H1>
                <MainTit>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, ea.</MainTit>
                <form onSubmit={searchHandler}>
                    <Input type="text" onChange={e => setInput(e.target.value)} />
                    <Button>search</Button>
                </form>
                <div style={{ color: '#fff', margin: '10px 0' }}>
                    {input}
                    {search &&
                        search.map((it) => {
                            return (
                                <li onClick={() => setOn(true)}><Link to={`/detail/${it.id}`}>{it.title}</Link></li>
                            )
                        })
                    }
                </div>
            </Header>

            <MovieSlideWrapper>
                <MovieSlide
                    {...MovieSlideOption}
                    ref={MainSlide}
                >
                    {
                        movie.slice(0, 30).map((it, idx) => {
                            return (
                                <GridItm key={idx} onClick={() => setOn(true)}>
                                    <Link to={`./detail/${it.id}`}>
                                        <Img src={it.large_cover_image}
                                            alt={it.title}
                                            onError={e => e.target.src = `${process.env.PUBLIC_URL}/cover.jpg`}
                                        />
                                        {/* onError는 이미지가 없을때 대체이미지를 꾸려주는 것 */}
                                        <Title>{it.title}</Title>
                                        {it.summary &&
                                            <Desc>
                                                {it.summary.substr(0, 150)}
                                                {it.summary.length > 150 ? '...' : ''}
                                            </Desc>
                                        }
                                        {/* substr은 글자갯수를 잘라주는 역할 */}
                                    </Link>
                                </GridItm>
                            )
                        })
                    }
                </MovieSlide>
                <MovieSlideLeftArrow onClick={() => MainSlide.current.slickPrev()}><BsArrowLeft /></MovieSlideLeftArrow>
                <MovieSlideRightArrow onClick={() => MainSlide.current.slickNext()}><BsArrowRight /></MovieSlideRightArrow>
            </MovieSlideWrapper>

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
                                            {it.summary &&
                                                <Desc>
                                                    {it.summary.substr(0, 150)}
                                                    {it.summary.length > 150 ? '...' : ''}
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