'use client';
import { useRef, useState } from 'react';

type Mode = 'text' | 'image' | 'ad';
export default function Home() {
  const [mode,setMode] = useState<Mode>('text');
  const [prompt,setPrompt] = useState('');
  const [ratio,setRatio] = useState('9:16');
  const [duration,setDuration] = useState('5');
  const [file,setFile] = useState<File|null>(null);
  const [preview,setPreview] = useState('');
  const [status,setStatus] = useState('');
  const [busy,setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  function chooseFile(f?:File) {
    if (!f) return;
    setFile(f); setPreview(URL.createObjectURL(f));
  }
  async function generate() {
    if (!prompt.trim()) { setStatus('Please enter a video prompt.'); return; }
    if (mode === 'image' && !file) { setStatus('Please upload an image first.'); return; }
    setBusy(true); setStatus('Submitting your request…');
    try {
      const body = new FormData();
      body.append('mode',mode); body.append('prompt',prompt);
      body.append('aspectRatio',ratio); body.append('duration',duration);
      if(file) body.append('image',file);
      const res = await fetch('/api/generate',{method:'POST',body});
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || 'Generation request failed');
      setStatus(data.message || 'Request submitted.');
    } catch(e) {
      setStatus(e instanceof Error ? e.message : 'Something went wrong.');
    } finally { setBusy(false); }
  }
  return <main className="shell">
    <header className="topbar">
      <a className="brand" href="#"><span className="brandIcon">▶</span> FSAAI</a>
      <span className="topTag">AI VIDEO STUDIO</span>
      <button className="logout" onClick={async()=>{await fetch('/api/logout',{method:'POST'});location.href='/login';}}>Log out</button><a className="help" href="#how">How it works</a>
    </header>
    <section className="hero">
      <div className="eyebrow"><i/> YOUR CREATIVE AI WORKSPACE</div>
      <h1>Ideas into <span>motion.</span></h1>
      <p>Create cinematic videos from text, images and product ideas.</p>
    </section>
    <section className="workspace">
      <div className="panel">
        <div className="panelHead"><div><small>CREATE NEW</small><h2>Video generator</h2></div><span className="spark">✦</span></div>
        <div className="tabs">
          <button className={mode==='text'?'active':''} onClick={()=>setMode('text')}>✎ Text to video</button>
          <button className={mode==='image'?'active':''} onClick={()=>setMode('image')}>▧ Image to video</button>
          <button className={mode==='ad'?'active':''} onClick={()=>setMode('ad')}>◇ Product ad</button>
        </div>
        {mode==='image' && <div className="upload" onClick={()=>input.current?.click()}>
          {preview ? <img src={preview} alt="Selected upload"/> : <><div className="uploadIcon">＋</div><b>Upload an image</b><span>PNG or JPG · Select a photo to animate</span></>}
          <input ref={input} type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>chooseFile(e.target.files?.[0])}/>
        </div>}
        {mode==='ad' && <div className="note">Product advertisement mode: describe the product, audience, visual style and offer. Upload support can be enabled with your provider integration.</div>}
        <label htmlFor="prompt">Describe your video</label>
        <textarea id="prompt" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder={mode==='ad'?'A premium cinematic product advertisement…':'A cinematic scene of…'} rows={5}/>
        <div className="controls">
          <div><label>Aspect ratio</label><select value={ratio} onChange={e=>setRatio(e.target.value)}><option>9:16</option><option>16:9</option><option>1:1</option></select></div>
          <div><label>Duration</label><select value={duration} onChange={e=>setDuration(e.target.value)}><option value="5">5 seconds</option><option value="10">10 seconds</option><option value="15">15 seconds</option></select></div>
        </div>
        <button className="generate" disabled={busy} onClick={generate}>{busy?'Working…':'✦  Generate video'}</button>
        {status && <div className="status" role="status">{status}</div>}
        <p className="fine">Generation may use paid provider credits once connected.</p>
      </div>
      <aside className="previewPanel">
        <div className="previewTop"><span>PREVIEW</span><span className="liveDot">● READY</span></div>
        <div className="previewCanvas">
          <div className="orb orb1"/><div className="orb orb2"/>
          <div className="play">▶</div>
          <div className="previewText"><small>YOUR NEXT CREATION</small><strong>Make it<br/>move.</strong></div>
          <div className="previewFoot"><span>FSAAI STUDIO</span><span>AI GENERATED</span></div>
        </div>
        <div className="previewHint"><span>✦</span><div><b>Your creative space</b><p>Your generated video will appear here when the AI provider is connected.</p></div></div>
      </aside>
    </section>
    <section className="features" id="how"><div><small>BUILT FOR CREATORS</small><h2>One studio. More possibilities.</h2></div>
      <div className="featureGrid"><article><b>01 / TEXT TO VIDEO</b><h3>Start with a prompt</h3><p>Describe a scene and send it to your connected video model.</p></article><article><b>02 / IMAGE TO VIDEO</b><h3>Bring photos to life</h3><p>Animate a still image with a motion description.</p></article><article><b>03 / PRODUCT ADS</b><h3>Make your product shine</h3><p>Prepare promotional concepts for social media campaigns.</p></article></div>
    </section>
    <footer><b>FSAAI</b><span>AI Video Studio · Built for imagination</span></footer>
  </main>;
}
