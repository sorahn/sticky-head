import React from "react"

const Paragraph = () => [
  <h3 key="title">Title</h3>,
  <p key="content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In elementum, sem
    quis tincidunt malesuada, enim urna congue lectus, sed malesuada tortor enim
    sed libero. Ut lacinia massa eu ipsum vulputate laoreet. Maecenas gravida
    nibh dolor, pulvinar porta quam suscipit eu. Quisque congue pulvinar mollis.
    Aliquam id ex non dolor imperdiet feugiat id eget sem. Curabitur non pretium
    purus. Aenean vel cursus mi, sit amet scelerisque metus. Maecenas tempus
    elit non purus iaculis blandit. Curabitur tincidunt ut ex non elementum.
    Phasellus et placerat tellus, eget aliquet nunc.
  </p>,
]

const Content = () => {
  return (
    <div className="row">
      <div className="col-12">
        <h2>Some additional content causing the page to scroll a bit</h2>
        <Paragraph />
        <Paragraph />
        <Paragraph />
        <Paragraph />
        <Paragraph />
        <Paragraph />
        <Paragraph />
        <Paragraph />
        <Paragraph />
        <Paragraph />
        <Paragraph />
        <Paragraph />
      </div>
    </div>
  )
}

export default Content
