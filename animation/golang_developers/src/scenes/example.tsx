import { makeScene2D, Path, Txt, Video } from "@motion-canvas/2d";
import { all, chain, createRef, delay, loop } from "@motion-canvas/core";
import matrixVideo from "../../../../assets/matrix.mp4";

function bellCurve(x1: number, x2: number, height: number) {
  var width = x2 - x1;
  var quart = width / 4;

  return `M0 ${height} C ${quart} ${height}, ${quart} 0, ${quart * 2} 0, ${
    quart * 3
  } 0, ${quart * 3} ${height}, ${quart * 4} ${height}`;
}

export default makeScene2D(function* (view) {
  const matrix = createRef<Video>();
  view.add(<Video ref={matrix} src={matrixVideo} />);
  matrix().play();
  matrix().loop(true);

  const txt1 = createRef<Txt>();
  const txt2 = createRef<Txt>();
  const txt3 = createRef<Txt>();
  const path = createRef<Path>();

  view.add(
    <Path
      ref={path}
      lineWidth={10}
      stroke={"#FFFFFF"}
      data="M-100,-200 l500,0 l0,600 l-500,0z"
      position={[-100, -100]}
    ></Path>
  );

  view.add(<Txt fill={"FFFFFF"} ref={txt1} text="Java" x={50} y={0} />);
  view.add(<Txt fill={"FFFFFF"} ref={txt2} text="" x={50} y={150} />);
  view.add(<Txt fill={"FFFFFF"} ref={txt3} text="" x={50} y={150} />);

  let bellcurve_base = bellCurve(0, 700, 400) + " M-50,400 l800,0";
  let bellcurve1 = bellcurve_base + "M250,400 l0,-340 M450,400 l0,-340";
  let bellcurve2 =
    bellcurve_base + " M150,400 l0,-140 M350,400 l0,-400 M550,400 l0,-140";
  let bellcurve3 =
    bellcurve_base + " M25,400 l0,-1, M250,400 l0,-340 M450,400 l0,-340";

  yield* delay(
    3,
    chain(
      all(
        txt1().y(-150, 0.5),
        txt1().text("Struts, JSF, etc", 0),
        txt2().text("Spring", 0.5)
      ),
      path().data("M-100,-200 l500,0 l0,600 l-500,0z M-100,100 l500,0", 1),
      delay(
        3,
        chain(
          txt1().text("", 0),
          path().data("M-100,100 l500,0 l0,300 l-500,0z", 1),
          delay(
            3,
            chain(
              all(
                txt1().y(150, 0),
                txt1().x(-130, 0),
                txt3().x(230, 0),
                txt1().text("v4", 0.5),
                txt2().text("v5", 0.5),
                txt3().text("v6", 0.5)
              ),
              path().data(
                "M-100,100 l500,0 l0,300 l-500,0z M50,100 l0,300 M250,100 l0,300",
                1
              ),
              delay(
                3,
                all(
                  txt1().y(250, 3),
                  txt2().y(250, 3),
                  txt3().y(250, 3),
                  txt1().x(-130, 3),
                  txt3().x(200, 3),
                  path().x(-300, 3),
                  chain(
                    path().data(bellcurve1, 3),
                    all(
                      txt1().text("", 0.3),
                      txt2().x(-60, 3),
                      txt3().x(150, 3),
                      path().data(bellcurve2, 3)
                    ),
                    delay(
                      3,
                      all(
                        txt1().text("v6.2", 3),
                        txt1().x(220, 3),
                        txt2().x(-130, 3),
                        txt3().x(50, 3),
                        path().data(bellcurve3, 3),
                        delay(6, txt1().text("v6.2", 3))
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  );
});
