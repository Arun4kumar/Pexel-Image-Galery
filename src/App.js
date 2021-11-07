import React, { useState, useEffect, useRef } from "react";
import Model from "./Model";
import {
  Container,
  Row,
  Button,
  Col,
  Form,
  Image,
  Spinner,
  FormControl,
  Alert,
} from "react-bootstrap";
import useFetch from "./hooks/useFetch";

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [mode, setMode] = useState(false);
  const [current, setCurrent] = useState();
  const [query, setQuery] = useState("");
  const [main, setMain] = useState(true);
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const que = useRef();
  const { loading, error, fetchRequest } = useFetch();

  const loader = useRef(null);
  const method = (data) => {
    setList([...list, ...data.photos]);
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    await setList([]);
    setPage(1);
  };
  const request =
    main == true
      ? {
          url: `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${5}`,
          data: {
            headers: {
              Authorization: process.env.REACT_APP_API_KEY,
            },
          },
        }
      : {
          url: `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${5}`,
          data: {
            headers: {
              Authorization: process.env.REACT_APP_API_KEY,
            },
          },
        };

  useEffect(() => {
    if (query.length === 0) {
      return;
    }
    fetchRequest(request, method);
  }, [page]);

  useEffect(() => {
    if (query === "") {
      return;
    }
    const set = setTimeout(async () => {
      setList([]);
      setPage((prev) => prev + 1);
    }, 1000);
    return function cleanup() {
      clearTimeout(set);
    };
  }, [query]);

  const scrollToEnd = () => {
    setPage((prev) => prev + 1);
  };

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      scrollToEnd();
    }
  };

  return (
    <div
      className={`${mode ? "bg-dark text-white" : "bg-light text-dark"} h-100`}
    >
      <Container>
        <Model
          setModalShow={setModalShow}
          mode={mode}
          show={modalShow}
          current={current}
          onHide={() => setModalShow(false)}
        ></Model>
        <Row className="d-flex text-center flex-wrap ">
          <h1 className="display-5">Pexel Image Search</h1>
          <h6 className="display-6 fs-6">
            Made by arun
            <button
              className="btn ms-3 btn-primary"
              onClick={() => {
                setMode(!mode);
              }}
            >
              {mode ? "Light" : "Dark"}
            </button>
          </h6>

          <Col>
            <Form onSubmit={searchHandler} className="d-flex my-1">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                ref={que}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                value={query}
              />
              <Button type="submit" variant="outline-success">
                Search
              </Button>
            </Form>
          </Col>
        </Row>

        <Row>
          <div className="d-flex justify-content-center flex-wrap mt-3">
            {list.length !== 0 ? (
              list.map((item, i) => (
                <div className="m-1">
                  <Image
                    onClick={() => {
                      console.log(true);
                      setModalShow(true);
                      setCurrent(item);
                    }}
                    rounded
                    fluid
                    key={item.id}
                    src={item.src.medium}
                  />
                </div>
              ))
            ) : (
              <div className="display-1">Please Search Image</div>
            )}
          </div>
          <div className="row justify-content-center">
            {loading && (
              <Spinner
                animation="grow"
                variant={mode ? "light" : "dark"}
                role="status"
                size="lg"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
            {error && <Alert variant="warning">{error.message}</Alert>}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default App;
