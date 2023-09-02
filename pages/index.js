import { styled } from "styled-components";

const Container = styled.div`
  padding: 0;
  margin: 0;
  box-sizing: border-box; 

  display: grid;
  height: 100vh;
  width: 100%;
  place-content: center;

  color: #fff;
  background: #222;
`

function Home() {
  return (
    <Container>
      <div>
        EM CONSTRUÇÃO
      </div>  
    </Container>
  )
}

export default Home;
