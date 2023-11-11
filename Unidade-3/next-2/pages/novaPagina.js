import { About } from "./about/about";
import { Img } from "./img/img";
import { Like } from "./like/like";

export default function Principal() {
    return (
        <div>
            <Img/>
            <About/>
            <Like language="Node.js"/>
        </div>
    );
}
