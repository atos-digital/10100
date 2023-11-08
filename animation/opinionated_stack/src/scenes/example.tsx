import { makeScene2D, Polygon, Txt, View2D, Video } from "@motion-canvas/2d";
import {
  Reference,
  SignalGenerator,
  ThreadGenerator,
  all,
  chain,
  createRef,
  loop,
} from "@motion-canvas/core";
import matrixVideo from "../../../../assets/matrix.mp4";

const JAVA = { x_from: -100, y_from: 0, text: "Java" };
const CSHARP = { x_from: -300, y_from: -110, text: "C#" };
const KUBE = { x_from: -300, y_from: 110, text: "K8S" };
const PAAS = { x_from: -500, y_from: 0, text: "PaaS" };
const GOLANG = {
  x_from: -100,
  y_from: -210,
  x_to: 500,
  y_to: -100,
  text: "Golang",
};
const SVRLESS = {
  x_from: -100,
  y_from: 210,
  x_to: 500,
  y_to: 100,
  text: "Svrless",
};

function add_view(
  view: View2D,
  shaperef: Reference<Polygon>,
  txtref: Reference<Txt>,
  x_from: number,
  y_from: number,
  text: string
) {
  view.add(
    <Polygon
      ref={shaperef}
      sides={6}
      size={200}
      fill={"lightseagreen"}
      x={x_from}
      y={y_from}
    />
  );
  view.add(
    <Txt fill={"FFFFFF"} ref={txtref} text={text} x={x_from} y={y_from} />
  );
}

function add_unstuck_mvmt(
  shaperef: Reference<Polygon>,
  txtref: Reference<Txt>,
  x_to: number,
  y_to: number,
  rotate: number
) {
  return all(
    chain(
      loop(10, () => shaperef().rotation(30, 0.5).back(0.5)),
      all(shaperef().y(y_to, 0.75), shaperef().x(x_to, 0.75)),
      shaperef().rotation(rotate, 10)
    ),
    chain(
      loop(10, () => txtref().rotation(30, 0.5).back(0.5)),
      all(txtref().x(x_to, 0.75), txtref().y(y_to, 0.75))
    )
  );
}

function add_stuck_mvmt(
  shaperef: Reference<Polygon>,
  txtref: Reference<Txt>,
  x_from: number,
  y_from: number
) {
  return all(
    loop(20, () => shaperef().rotation(30, 0.5).back(0.5)),
    loop(20, () => txtref().rotation(30, 0.5).back(0.5))
  );
}

export default makeScene2D(function* (view) {
  const matrix = createRef<Video>();
  view.add(<Video ref={matrix} src={matrixVideo} />);
  matrix().play();
  matrix().loop(true);

  const java = createRef<Polygon>();
  const javaTxt = createRef<Txt>();
  const golang = createRef<Polygon>();
  const golangTxt = createRef<Txt>();
  const csharp = createRef<Polygon>();
  const csharpTxt = createRef<Txt>();
  const kube = createRef<Polygon>();
  const kubeTxt = createRef<Txt>();
  const svrless = createRef<Polygon>();
  const svrlessTxt = createRef<Txt>();
  const paas = createRef<Polygon>();
  const paasTxt = createRef<Txt>();

  add_view(view, java, javaTxt, JAVA.x_from, JAVA.y_from, JAVA.text);
  add_view(view, csharp, csharpTxt, CSHARP.x_from, CSHARP.y_from, CSHARP.text);
  add_view(view, golang, golangTxt, GOLANG.x_from, GOLANG.y_from, GOLANG.text);
  add_view(view, kube, kubeTxt, KUBE.x_from, KUBE.y_from, KUBE.text);
  add_view(view, paas, paasTxt, PAAS.x_from, PAAS.y_from, PAAS.text);
  add_view(
    view,
    svrless,
    svrlessTxt,
    SVRLESS.x_from,
    SVRLESS.y_from,
    SVRLESS.text
  );

  yield* all(
    matrix().scale(1.2, 1.2),
    add_stuck_mvmt(paas, paasTxt, PAAS.x_from, PAAS.y_from),
    add_stuck_mvmt(java, javaTxt, JAVA.x_from, JAVA.y_from),
    add_stuck_mvmt(csharp, csharpTxt, CSHARP.x_from, CSHARP.y_from),
    add_stuck_mvmt(kube, kubeTxt, KUBE.x_from, KUBE.y_from),
    add_unstuck_mvmt(golang, golangTxt, GOLANG.x_to, GOLANG.y_to, 5000),
    add_unstuck_mvmt(svrless, svrlessTxt, SVRLESS.x_to, SVRLESS.y_to, -5000)
  );
});
function delay(
  arg0: number,
  arg1: SignalGenerator<number, number>
): ThreadGenerator {
  throw new Error("Function not implemented.");
}
