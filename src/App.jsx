import React, { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Float, Html, OrbitControls, useGLTF } from '@react-three/drei';
import { ArrowDownRight, ArrowRight, ShoppingBag, Menu, X, Search, Heart, Plus, Minus, Check, Sparkles } from 'lucide-react';
import * as THREE from 'three';

const products = [
  { id: 1, name: 'Velocity One', category: 'Running', price: 6499, oldPrice: 7999, color: 'Volt / Black', tag: 'BEST SELLER', bg: 'lime', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85', desc: 'Light on your feet. Unstoppable in motion. Responsive cushioning meets a featherweight knit upper.' },
  { id: 2, name: 'Cloudform Pro', category: 'Lifestyle', price: 7299, oldPrice: null, color: 'Cloud / Silver', tag: 'NEW DROP', bg: 'lavender', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=85', desc: 'Everyday comfort, re-engineered. Soft landings and a clean silhouette for wherever the day takes you.' },
  { id: 3, name: 'Street Theory', category: 'Streetwear', price: 5799, oldPrice: null, color: 'Bone / Sand', tag: 'LIMITED', bg: 'sand', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=85', desc: 'A little attitude goes a long way. A durable everyday sneaker with premium texture and street-ready style.' },
  { id: 4, name: 'Aero Sprint', category: 'Running', price: 6899, oldPrice: 7499, color: 'Ice / Blue', tag: 'PERFORMANCE', bg: 'blue', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1000&q=85', desc: 'Built for the next personal best. Engineered support and energetic rebound for your daily miles.' },
  { id: 5, name: 'Retro Motion', category: 'Lifestyle', price: 4999, oldPrice: null, color: 'White / Red', tag: 'CLASSIC', bg: 'pink', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=85', desc: 'Vintage inspiration, modern comfort. A timeless profile made for daily rotation.' },
  { id: 6, name: 'Trail Seeker', category: 'Outdoor', price: 7999, oldPrice: null, color: 'Moss / Stone', tag: 'ALL TERRAIN', bg: 'green', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85', desc: 'Take the long way. Grippy traction and a protective build made for paths less travelled.' }
];

const formatPrice = value => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
}).format(value);

function ShoeModel() {
  const group = useRef();
  const soleMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#e8e8dc', roughness: .48 }), []);
  const outsoleMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#77796e', roughness: .72 }), []);
  const upperMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#b9ef48', roughness: .43, metalness: .02 }), []);
  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#20221d', roughness: .48 }), []);
  const laceMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f3f3e9', roughness: .68 }), []);
  useFrame((state, delta) => {
    if (group.current) {
      const time = state.clock.elapsedTime;
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -.25 + Math.sin(time * .48) * .18 + state.pointer.x * .3, delta, 2.5);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, .08 - state.pointer.y * .12, delta, 2.5);
      group.current.rotation.z = -.13 + Math.sin(time * .7) * .025;
      group.current.position.y = Math.sin(time * 1.2) * .07;
    }
  });
  return <group ref={group} rotation={[.08, -.25, -.13]} scale={1.18}>
    <Float speed={1.2} rotationIntensity={.08} floatIntensity={.18}>
      {/* Layered, horizontal outsole and cushioned midsole. */}
      <mesh position={[0, -.72, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <capsuleGeometry args={[.14, 2.12, 8, 24]} />
        <primitive object={outsoleMat} attach="material" />
      </mesh>
      <mesh position={[0, -.51, 0]} rotation={[0, 0, Math.PI / 2 - .025]} castShadow receiveShadow>
        <capsuleGeometry args={[.24, 2.15, 8, 20]} />
        <primitive object={soleMat} attach="material" />
      </mesh>
      {/* Knit upper, rounded toe, and padded heel. */}
      <mesh position={[.02, 0, 0]} rotation={[0, 0, -.08]} scale={[1.0, .58, .58]} castShadow>
        <sphereGeometry args={[1, 40, 28]} />
        <primitive object={upperMat} attach="material" />
      </mesh>
      {/* Toe cap */}
      <mesh position={[.78, -.12, .01]} rotation={[0, 0, -.18]} scale={[.63, .37, .54]} castShadow>
        <sphereGeometry args={[1, 32, 20]} />
        <primitive object={upperMat} attach="material" />
      </mesh>
      {/* Heel counter */}
      <mesh position={[-.72, .03, 0]} rotation={[0, 0, -.15]} scale={[.38, .52, .7]} castShadow>
        <sphereGeometry args={[1, 28, 18]} />
        <primitive object={accentMat} attach="material" />
      </mesh>
      {/* Padded collar and tongue. */}
      <mesh position={[-.49, .39, 0]} rotation={[0, 0, -.18]} scale={[.38, .19, .48]} castShadow>
        <sphereGeometry args={[1, 28, 18]} />
        <primitive object={accentMat} attach="material" />
      </mesh>
      <mesh position={[.08, .43, 0]} rotation={[0, 0, -.36]} scale={[.24, .55, .38]} castShadow>
        <boxGeometry args={[.55, .8, .12, 3, 3, 1]} />
        <primitive object={accentMat} attach="material" />
      </mesh>
      {/* Cross-laces on the visible side of the upper. */}
      {[-.2, -.04, .12, .28, .44].map((x, i) => <mesh key={i} position={[x, .43 - i * .045, .39 + i * .025]} rotation={[0, 0, i % 2 ? .16 : -.16]} castShadow>
        <boxGeometry args={[.33, .035, .045]} />
        <primitive object={laceMat} attach="material" />
      </mesh>)}
      {/* Raahi's three-bar side mark. */}
      {[-.11, .02, .15].map((y, i) => <mesh key={i} position={[.02 + i * .035, y + .015, .43 + i * .065]} rotation={[0, 0, -.32]} castShadow>
        <boxGeometry args={[.52, .055, .035]} />
        <primitive object={accentMat} attach="material" />
      </mesh>)}
    </Float>
  </group>;
}

function Hero3D() {
  return <div className="hero-3d">
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, .85, 4.5], fov: 37 }}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 5, 4]} intensity={2.4} castShadow />
      <pointLight position={[-3, 1, -2]} intensity={1.3} color="#c6ff55" />
      <Suspense fallback={<Html center><span className="loading">Loading 3D…</span></Html>}>
        <ShoeModel />
        <Environment preset="city" />
      </Suspense>
      <ContactShadows position={[0, -1.12, 0]} opacity={.32} scale={5} blur={2.5} far={3} />
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={1.05} maxPolarAngle={2.05} rotateSpeed={.7} />
    </Canvas>
    <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
    <div className="floating-label label-top"><span className="dot"></span> DRAG TO EXPLORE</div>
    <div className="floating-label label-bottom"><span>01</span> / NEW GENERATION</div>
  </div>;
}

function ProductCard({ product, onAdd, onDetails, isFavorite, onFavorite }) {
  return <article className={`product-card ${product.bg}`}>
    <div className="product-image-wrap" onClick={() => onDetails(product)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onDetails(product)}>
      <span className="product-tag">{product.tag}</span>
      <button className={`favorite ${isFavorite ? 'is-favorite' : ''}`} aria-label="Add to favorites" onClick={e => {e.stopPropagation(); onFavorite(product.id)}}><Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} /></button>
      <img src={product.image} alt={product.name} loading="lazy" />
      <button className="quick-add" onClick={e => {e.stopPropagation(); onAdd(product)}}><Plus size={18} /> Quick add</button>
    </div>
    <div className="product-meta">
      <div><p className="product-category">{product.category} / {product.color}</p><h3>{product.name}</h3></div>
      <div className="product-price">{formatPrice(product.price)}{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</div>
    </div>
    <button className="details-link" onClick={() => onDetails(product)}>Explore shoe <ArrowRight size={15} /></button>
  </article>;
}

function App() {
  const [cart, setCart] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const categories = ['All', 'Running', 'Lifestyle', 'Streetwear', 'Outdoor'];
  const filtered = products.filter(p => (filter === 'All' || p.category === filter) && `${p.name} ${p.category} ${p.color}`.toLowerCase().includes(search.toLowerCase()));
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const addToCart = product => {
    setCart(prev => {
      const found = prev.find(i => i.id === product.id);
      return found ? prev.map(i => i.id === product.id ? {...i, qty: i.qty + 1} : i) : [...prev, {...product, qty: 1}];
    });
    setCheckoutMessage('');
    setCartOpen(true);
  };
  const changeQty = (id, amount) => setCart(prev => prev.map(i => i.id === id ? {...i, qty: i.qty + amount} : i).filter(i => i.qty > 0));
  const toggleFavorite = id => setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setMobileMenu(false); };
  const buyNow = product => { addToCart(product); setActiveProduct(null); };
  return <div className="app-shell">
    <div className="announcement"><Sparkles size={13} /> FREE SHIPPING ACROSS INDIA ON ORDERS OVER ₹4,999 <span>—</span> BUILT FOR EVERY MOVE</div>
    <header className="navbar">
      <a className="brand" href="#home" aria-label="Raahi home"><span className="brand-mark">R</span><span>RAAHI<i>.</i></span></a>
      <nav className={mobileMenu ? 'nav-links nav-open' : 'nav-links'}>
        <button onClick={() => scrollTo('shop')}>Shop all</button>
        <button onClick={() => {setFilter('Running'); scrollTo('shop')}}>Running</button>
        <button onClick={() => scrollTo('story')}>Our story</button>
        <button onClick={() => scrollTo('community')}>Community</button>
      </nav>
      <div className="nav-actions">
        <button className="icon-btn search-toggle" aria-label="Search products" onClick={() => {setSearchOpen(!searchOpen); scrollTo('shop')}}><Search size={19}/></button>
        <button className="cart-trigger" onClick={() => setCartOpen(true)}><ShoppingBag size={18}/><span>Bag</span><b>{cartCount}</b></button>
        <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X/> : <Menu/>}</button>
      </div>
    </header>
    {searchOpen && <div className="search-bar"><Search size={18}/><input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search shoes, styles, categories..." /><button onClick={()=>{setSearch('');setSearchOpen(false)}}><X size={18}/></button></div>}
    <main>
      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"></span> ROOTED IN INDIA. READY FOR EVERYWHERE.</div>
          <h1>FIND YOUR<br/><span>OWN</span> <em>FLOW.</em></h1>
          <p className="hero-description">From busy city streets to weekend escapes, find your stride in footwear made for every side of life in India.</p>
          <div className="hero-buttons"><button className="button-primary" onClick={()=>scrollTo('shop')}>Explore collection <ArrowRight size={17}/></button><button className="button-ghost" onClick={()=>scrollTo('story')}>Our philosophy <ArrowDownRight size={18}/></button></div>
          <div className="hero-proof"><div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div><div><strong>4.9/5</strong><p>MADE FOR EVERYDAY INDIA</p></div></div>
        </div>
        <Hero3D />
        <div className="hero-bottom"><span>01 — 03</span><div className="hero-progress"><i></i></div><span>ENGINEERED FOR EVERYDAY</span><button onClick={()=>scrollTo('shop')} aria-label="Scroll to products"><ArrowDownRight size={20}/></button></div>
        <div className="hero-watermark">MOVE DIFFERENT</div>
      </section>
      <section className="ticker" aria-label="Brand values"><div className="ticker-track">{Array.from({length:2}).map((_,i)=><React.Fragment key={i}><span>MADE FOR YOUR EVERYDAY</span><b>✳</b><span>FROM CITY TO SUMMIT</span><b>✳</b><span>LESS LIMITS. MORE LIFE.</span><b>✳</b><span>FIND YOUR FLOW</span><b>✳</b></React.Fragment>)}</div></section>
      <section className="shop-section section-pad" id="shop">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"></span> YOUR NEXT EVERYDAY</div><h2>THE ROTATION<span>.</span></h2></div><p>Thoughtfully built. Impossible to ignore.<br/>Find the pair that feels like you.</p></div>
        <div className="shop-controls"><div className="filters">{categories.map(c=><button key={c} onClick={()=>setFilter(c)} className={filter===c?'filter-active':''}>{c}</button>)}</div><span className="result-count">{filtered.length} PRODUCTS</span></div>
        <div className="product-grid">{filtered.map(p=><ProductCard key={p.id} product={p} onAdd={addToCart} onDetails={setActiveProduct} isFavorite={favorites.includes(p.id)} onFavorite={toggleFavorite}/>)}</div>
        {filtered.length===0 && <div className="empty-search">No shoes found. Try another search.</div>}
        <div className="shop-footer"><span>SHOWING {filtered.length} OF {products.length} STYLES</span><button className="button-outline" onClick={()=>{setFilter('All');setSearch('')}}>View all styles <ArrowRight size={16}/></button></div>
      </section>
      <section className="feature-band" id="story">
        <div className="feature-image"><img src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1400&q=85" alt="Sneaker craftsmanship detail" loading="lazy"/><div className="image-stamp">DESIGNED<br/>TO MOVE<span>✳</span></div></div>
        <div className="feature-copy"><div className="eyebrow"><span className="eyebrow-line"></span> OUR POINT OF VIEW</div><h2>GOOD DESIGN.<br/><em>NO SHORTCUTS.</em></h2><p>We believe the best gear disappears into the experience. Every curve, cushion, and stitch has a purpose: to keep you moving with less friction and more freedom, wherever you are in India.</p><div className="feature-stats"><div><strong>01</strong><span>Purposeful<br/>design</span></div><div><strong>02</strong><span>All-day<br/>comfort</span></div><div><strong>03</strong><span>Built to<br/>last</span></div></div><button className="button-primary" onClick={()=>scrollTo('community')}>The Raahi way <ArrowRight size={17}/></button></div>
      </section>
      <section className="benefits section-pad"><div className="benefit"><span className="benefit-icon">↗</span><div><h3>MOVE LIGHT</h3><p>Featherweight builds that keep your stride feeling effortless.</p></div></div><div className="benefit"><span className="benefit-icon">◉</span><div><h3>MADE FOR MORE</h3><p>Versatile comfort from first coffee to last call.</p></div></div><div className="benefit"><span className="benefit-icon">✳</span><div><h3>BETTER BY DESIGN</h3><p>Considered materials, made to show up again and again.</p></div></div></section>
      <section className="community" id="community"><div className="community-orb">R<span>✳</span></div><div className="eyebrow"><span className="eyebrow-line"></span> THE MOVEMENT IS YOURS</div><h2>WHERE WILL<br/>YOU <em>GO?</em></h2><p>New drops, movement stories, and first access to what’s next.</p><form className="newsletter" onSubmit={e=>{e.preventDefault();setCheckoutMessage('You’re on the list. See you out there!')}}><input type="email" placeholder="Your email address" required/><button aria-label="Subscribe"><ArrowRight/></button></form>{checkoutMessage && !cartOpen && <p className="success-note"><Check size={15}/> {checkoutMessage}</p>}<small>BY JOINING, YOU AGREE TO OUR OCCASIONAL EMAILS. NO SPAM, EVER.</small></section>
    </main>
    <footer className="footer"><div className="footer-top"><a className="brand" href="#home" aria-label="Raahi home"><span className="brand-mark">R</span><span>RAAHI<i>.</i></span></a><p>Built for every version of you.</p><button onClick={()=>scrollTo('home')}>BACK TO TOP ↑</button></div><div className="footer-bottom"><span>© 2026 RAAHI INDIA</span><div><a href="#shop">SHOP</a><a href="#story">OUR STORY</a><a href="#community">CONTACT</a></div><span>MOVE YOUR WAY.</span></div></footer>
    {cartOpen && <div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&setCartOpen(false)}><aside className="cart-drawer"><div className="drawer-head"><div><span className="eyebrow">YOUR SELECTION</span><h2>YOUR BAG <span>({cartCount})</span></h2></div><button className="close-btn" onClick={()=>setCartOpen(false)} aria-label="Close cart"><X/></button></div>
      {cart.length===0 ? <div className="cart-empty"><ShoppingBag size={42}/><h3>Your bag is taking a breather.</h3><p>Good things start with a great pair.</p><button className="button-primary" onClick={()=>{setCartOpen(false);scrollTo('shop')}}>Explore shoes <ArrowRight size={16}/></button></div> : <><div className="cart-items">{cart.map(item=><div className="cart-item" key={item.id}><img src={item.image} alt={item.name}/><div className="cart-item-info"><h3>{item.name}</h3><p>{item.color}</p><strong>{formatPrice(item.price)}</strong><div className="qty-control"><button onClick={()=>changeQty(item.id,-1)}><Minus size={13}/></button><span>{item.qty}</span><button onClick={()=>changeQty(item.id,1)}><Plus size={13}/></button></div></div><button className="remove-item" onClick={()=>setCart(prev=>prev.filter(i=>i.id!==item.id))}>Remove</button></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><p>Delivery and applicable taxes are calculated at checkout.</p><button className="button-primary checkout" onClick={()=>setCheckoutMessage('Demo checkout: your cart is ready. Connect an Indian payment provider to accept real orders.')}>Continue to checkout <ArrowRight size={17}/></button>{checkoutMessage && <p className="checkout-message">{checkoutMessage}</p>}<small><Check size={13}/> UPI · CARDS · EASY RETURNS</small></div></>}
    </aside></div>}
    {activeProduct && <div className="overlay product-overlay" onMouseDown={e=>e.target===e.currentTarget&&setActiveProduct(null)}><div className="product-modal"><button className="close-btn modal-close" onClick={()=>setActiveProduct(null)} aria-label="Close product details"><X/></button><div className={`modal-image ${activeProduct.bg}`}><img src={activeProduct.image} alt={activeProduct.name}/><span className="product-tag">{activeProduct.tag}</span></div><div className="modal-copy"><div className="eyebrow"><span className="eyebrow-line"></span>{activeProduct.category} / {activeProduct.color}</div><h2>{activeProduct.name}<span>.</span></h2><div className="modal-price">{formatPrice(activeProduct.price)} {activeProduct.oldPrice && <del>{formatPrice(activeProduct.oldPrice)}</del>}</div><p>{activeProduct.desc}</p><div className="size-label">SELECT SIZE <span>UK / INDIA</span></div><div className="sizes">{[6,7,8,9,10,11].map(n=><button key={n} className={n===8?'size-selected':''} onClick={e=>{document.querySelectorAll('.sizes button').forEach(b=>b.classList.remove('size-selected'));e.currentTarget.classList.add('size-selected')}}>{n}</button>)}</div><button className="button-primary modal-add" onClick={()=>buyNow(activeProduct)}>Add to bag <ShoppingBag size={17}/></button><div className="modal-perks"><span><Check size={14}/> Free shipping over ₹4,999</span><span><Check size={14}/> Easy 30-day returns</span></div></div></div></div>}
  </div>;
}

export default App;