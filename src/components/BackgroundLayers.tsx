export default function BackgroundLayers() {
  return (
    <>
      <div className="bg-glow-br" aria-hidden="true" />
      <div className="bg-glow-tr" aria-hidden="true" />
      <div className="bg-scanlines" aria-hidden="true" />
      <div className="bg-code" aria-hidden="true">
        <span className="cmt"># career journey</span><br />
        <span className="kw">class</span>{' Developer'}<br />
        &nbsp;&nbsp;<span className="kw">include</span> <span className="acc">Curious</span><br />
        <br />
        &nbsp;&nbsp;<span className="kw">def</span> <span className="fn">initialize</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;{'@grade = '}<span className="str">&quot;V0&quot;</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;{'@stack = ['}<span className="str">&quot;Ruby&quot;</span>
        {', '}<span className="str">&quot;Rails&quot;</span>{','}<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="str">&quot;Next.js&quot;</span>{']'}<br />
        &nbsp;&nbsp;<span className="kw">end</span><br />
        <br />
        &nbsp;&nbsp;<span className="kw">def</span> <span className="fn">climb</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;{'@grade.'}<span className="fn">next!</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">self</span><br />
        &nbsp;&nbsp;<span className="kw">end</span><br />
        <span className="kw">end</span><br />
        <br />
        <span className="acc">Developer</span>{'.'}<span className="fn">new</span>
        {'.'}<span className="fn">climb</span>
      </div>
    </>
  )
}
