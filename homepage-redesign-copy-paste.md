# Homepage Redesign

Keep your `<script setup>` exactly as it is.

Replace only the current customer homepage block that starts with:

```vue
<section v-else class="market-page market-page--wide home-page" aria-label="Faqja kryesore">
```

and ends with its matching `</section>` with this:

```vue
<section v-else class="market-page market-page--wide home-page" aria-label="Faqja kryesore">
  <div
    v-if="ui.message"
    :class="['market-status', ui.type === 'error' ? 'market-status--error' : ui.type === 'success' ? 'market-status--success' : '']"
    role="status"
    aria-live="polite"
  >
    {{ ui.message }}
  </div>

  <section class="home-page__hero">
    <article class="market-card home-page__hero-card">
      <div class="home-page__hero-copy">
        <p class="home-page__eyebrow">Marketplace i produkteve lokale</p>
        <h1>{{ activeCommerceHeroProduct ? activeCommerceHeroProduct.title : "Blej me shpejt nga dyqanet lokale" }}</h1>
        <p class="home-page__hero-lead">
          {{
            activeCommerceHeroProduct
              ? (activeCommerceHeroProduct.description || "Oferta reale, cmime te qarta dhe rruge e shkurter drejt blerjes.")
              : "Produkte reale, cmime te qarta dhe rruge e shkurter drejt blerjes pa zhurme vizuale."
          }}
        </p>

        <form class="home-page__search" @submit.prevent="submitHeroSearch">
          <input
            v-model="heroSearchQuery"
            type="search"
            placeholder="Kerko produkte, marka ose kategori"
            aria-label="Kerko ne marketplace"
          >
          <button class="market-button market-button--secondary" type="button" @click="openHeroVisualSearchPicker">
            Kerko me foto
          </button>
          <button class="market-button market-button--primary" type="submit">
            Kerko
          </button>
          <input
            ref="heroVisualSearchInputElement"
            class="visually-hidden"
            type="file"
            accept="image/*"
            @change="handleHeroVisualSearchSelection"
          >
        </form>

        <div class="home-page__quick-links" aria-label="Rruge te shpejta">
          <button
            v-for="item in homeQuickChips"
            :key="item.label"
            class="market-pill"
            type="button"
            @click="item.type === 'scroll' ? scrollToMarketplaceSection(item.target) : router.push(item.to)"
          >
            {{ item.label }}
          </button>
        </div>

        <div class="home-page__hero-actions">
          <RouterLink
            class="market-button market-button--primary"
            :to="activeCommerceHeroProduct ? getProductDetailUrl(activeCommerceHeroProduct.id, '/') : '/kerko'"
          >
            Shiko produktin
          </RouterLink>
          <RouterLink class="market-button market-button--secondary" to="/kerko">
            Hape katalogun
          </RouterLink>
        </div>

        <div class="home-page__hero-metrics">
          <article class="home-page__hero-metric">
            <strong>{{ curatedProductsDisplay }}+</strong>
            <span>produkte aktive</span>
          </article>
          <article class="home-page__hero-metric">
            <strong>{{ localBrandsDisplay }}+</strong>
            <span>marka lokale</span>
          </article>
          <article class="home-page__hero-metric">
            <strong>{{ highestDiscountDisplay }}</strong>
            <span>ulja me e larte tani</span>
          </article>
        </div>
      </div>

      <div v-if="activeCommerceHeroProduct" class="home-page__hero-media">
        <img
          :src="activeCommerceHeroProduct.imagePath"
          :alt="activeCommerceHeroProduct.title"
          width="860"
          height="860"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        >
        <div class="home-page__hero-floating">
          <span class="market-pill market-pill--accent">{{ getShowcaseBadge(activeCommerceHeroProduct) }}</span>
          <strong>{{ formatPrice(activeCommerceHeroProduct.price) }}</strong>
          <small>{{ activeCommerceHeroProduct.businessName || "Marketplace seller" }}</small>
        </div>
      </div>
    </article>

    <div v-if="homeHeroMiniPanels.length > 0" class="home-page__hero-rail">
      <RouterLink
        v-for="panel in homeHeroMiniPanels"
        :key="panel.key"
        class="market-card home-page__mini-card"
        :to="panel.to"
      >
        <img
          :src="panel.imagePath"
          :alt="panel.title"
          width="176"
          height="176"
          loading="lazy"
          decoding="async"
        >
        <div class="home-page__mini-card-copy">
          <span>{{ panel.label }}</span>
          <strong>{{ panel.title }}</strong>
          <small>{{ panel.copy }}</small>
        </div>
      </RouterLink>
    </div>
  </section>

  <section class="home-page__utility-strip" aria-label="Sherbimet kryesore">
    <article
      v-for="item in commerceServiceCards"
      :key="item.title"
      class="market-card home-page__utility-item"
    >
      <span class="home-page__utility-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path :d="renderCommerceIcon(item.icon)" />
        </svg>
      </span>
      <div>
        <strong>{{ item.title }}</strong>
        <p>{{ item.copy }}</p>
      </div>
    </article>
  </section>

  <section class="home-page__section" aria-label="Kategorite kryesore">
    <MarketSectionTitle
      eyebrow="Shop faster"
      title="Kategorite qe te cojne me shpejt te produkti"
      copy="Me pak seksione, me pak hapesire boshe dhe me shume qartesi ne hyrje."
      action-label="Shiko te gjitha"
      action-to="/kerko"
    />

    <div class="home-page__category-grid">
      <RouterLink
        v-for="category in categoryShelfCards"
        :key="category.value"
        class="market-card home-page__category-card"
        :to="category.href || '/kerko'"
      >
        <div class="home-page__category-card-body">
          <span class="market-pill">{{ category.count }} artikuj</span>
          <strong>{{ category.label }}</strong>
          <p>{{ category.helper }}</p>
        </div>
        <img
          :src="category.imagePath"
          :alt="category.label"
          width="300"
          height="220"
          loading="lazy"
          decoding="async"
        >
      </RouterLink>
    </div>
  </section>

  <section v-if="bestDealsProducts.length > 0" class="home-page__section" aria-label="Oferta kryesore">
    <div class="search-toolbar">
      <MarketSectionTitle
        eyebrow="Best deals"
        title="Oferta te qarta qe ia vlejne tani"
        copy="Ketu mbajme vetem produktet me sinjalin me te forte per blerje: zbritje, interes dhe stok."
        action-label="Shiko katalogun"
        action-to="/kerko"
      />
      <span class="market-pill market-pill--accent">{{ dealsCountdownText }}</span>
    </div>

    <section class="product-collection__grid" aria-label="Ofertat kryesore">
      <ProductCard
        v-for="product in bestDealsProducts.slice(0, 8)"
        :key="`best-deal-${product.id}`"
        :product="product"
        :is-wishlisted="wishlistIds.includes(product.id)"
        :is-in-cart="cartIds.includes(product.id)"
        :wishlist-busy="busyWishlistIds.includes(product.id)"
        :cart-busy="busyCartIds.includes(product.id)"
        :is-compared="comparedProductIds.includes(product.id)"
        @wishlist="handleWishlist"
        @cart="handleCart"
        @compare="handleCompare"
      />
    </section>
  </section>

  <section
    v-if="homeBusinessBillboard"
    id="home-marketplace-local-brands"
    class="market-card home-page__seller-band"
    aria-label="Biznes i vecuar"
  >
    <div class="home-page__seller-brand">
      <div class="home-page__seller-head">
        <img
          v-if="homeBusinessBillboard.business.logoPath"
          :src="homeBusinessBillboard.business.logoPath"
          :alt="homeBusinessBillboard.business.businessName"
          width="96"
          height="96"
          loading="lazy"
          decoding="async"
        >
        <span v-else class="home-page__seller-mark">
          {{ getBusinessInitials(homeBusinessBillboard.business.businessName) }}
        </span>

        <div>
          <p class="home-page__eyebrow">Local spotlight</p>
          <h2>{{ homeBusinessBillboard.business.businessName }}</h2>
          <p>
            {{
              homeBusinessBillboard.business.businessDescription
                || "Biznes lokal me produkte aktive dhe profil publik gati per blerje."
            }}
          </p>
        </div>
      </div>

      <div class="home-page__seller-pills">
        <span class="market-pill">{{ homeBusinessBillboard.business.city || "Marketplace seller" }}</span>
        <span class="market-pill">{{ homeBusinessBillboard.relatedProducts.length }} produkte</span>
        <span class="market-pill">{{ homeBusinessBillboard.business.followersCount || 0 }} followers</span>
      </div>
    </div>

    <div class="home-page__seller-links">
      <RouterLink
        v-for="product in homeBusinessBillboard.relatedProducts.slice(0, 2)"
        :key="`spotlight-link-${product.id}`"
        class="home-page__seller-link"
        :to="getProductDetailUrl(product.id, '/')"
      >
        <img
          :src="product.imagePath"
          :alt="product.title"
          width="84"
          height="84"
          loading="lazy"
          decoding="async"
        >
        <div>
          <strong>{{ product.title }}</strong>
          <small>{{ formatPrice(product.price) }}</small>
        </div>
      </RouterLink>

      <RouterLink class="market-button market-button--primary" :to="homeBusinessBillboard.target">
        Shiko dyqanin
      </RouterLink>
    </div>
  </section>

  <section id="home-marketplace-catalog" class="home-page__section home-page__catalog" aria-label="Te gjitha produktet">
    <div class="search-toolbar home-page__catalog-head">
      <MarketSectionTitle
        eyebrow="All products"
        title="Katalog i paster dhe me i lehte per perdorim"
        copy="Grid-i kryesor eshte mbajtur kompakt, me filtra te shpejte dhe me me pak hapesire te humbur."
      />

      <div class="home-page__catalog-actions">
        <button class="market-button market-button--secondary" type="button" @click="toggleFiltersPanel">
          {{ filtersVisible ? "Mbyll filtrat" : "Filtra te shpejte" }}
        </button>
        <p class="home-page__collection-label">{{ collectionLabel }}</p>
      </div>
    </div>

    <div v-if="filtersVisible" class="market-card market-card--padded home-page__filters">
      <label class="market-form-field">
        <span>Seksioni</span>
        <select v-model="filters.pageSection" @change="handlePageSectionChange">
          <option value="">Te gjitha</option>
          <option
            v-for="option in availablePageSectionOptions"
            :key="option.value || option.label"
            :value="option.value || option.label"
          >
            {{ option.label || option.value }}
          </option>
        </select>
      </label>

      <label v-if="availableCategoryOptions.length > 0" class="market-form-field">
        <span>Kategoria</span>
        <select v-model="filters.category" @change="handleCategoryChange">
          <option value="">Te gjitha</option>
          <option
            v-for="option in availableCategoryOptions"
            :key="option.value || option.label"
            :value="option.value || option.label"
          >
            {{ option.label || option.value }}
          </option>
        </select>
      </label>

      <label v-if="shouldShowProductTypeFilter" class="market-form-field">
        <span>Tipi</span>
        <select v-model="filters.productType" @change="handleCatalogFilterChange">
          <option value="">Te gjitha</option>
          <option
            v-for="option in availableProductTypeOptions"
            :key="option.value || option.label"
            :value="option.value || option.label"
          >
            {{ option.label || option.value }}
          </option>
        </select>
      </label>

      <label class="market-form-field">
        <span>Masa</span>
        <select v-model="filters.size" @change="handleCatalogFilterChange">
          <option value="">Te gjitha</option>
          <option
            v-for="option in availableSizeOptions"
            :key="option.value || option.label"
            :value="option.value || option.label"
          >
            {{ option.label || option.value }}
          </option>
        </select>
      </label>

      <label class="market-form-field">
        <span>Ngjyra</span>
        <select v-model="filters.color" @change="handleCatalogFilterChange">
          <option value="">Te gjitha</option>
          <option
            v-for="option in availableColorOptions"
            :key="option.value || option.label"
            :value="option.value || option.label"
          >
            {{ option.label || option.value }}
          </option>
        </select>
      </label>

      <label class="market-form-field">
        <span>Renditja</span>
        <select v-model="filters.sort" @change="handleCatalogFilterChange">
          <option value="">Rekomanduar</option>
          <option value="price-asc">Cmimi: nga me i ulte</option>
          <option value="price-desc">Cmimi: nga me i larte</option>
        </select>
      </label>

      <div class="home-page__filters-actions">
        <button class="market-button market-button--secondary" type="button" @click="resetFilters">
          Pastro filtrat
        </button>
      </div>
    </div>

    <section v-if="filteredProducts.length > 0" class="product-collection__grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        :is-wishlisted="wishlistIds.includes(product.id)"
        :is-in-cart="cartIds.includes(product.id)"
        :wishlist-busy="busyWishlistIds.includes(product.id)"
        :cart-busy="busyCartIds.includes(product.id)"
        :is-compared="comparedProductIds.includes(product.id)"
        @wishlist="handleWishlist"
        @cart="handleCart"
        @compare="handleCompare"
      />
    </section>

    <div v-else class="market-empty">
      <h3>Nuk ka produkte publike ende</h3>
      <p>Marketplace do te mbushet automatikisht sapo bizneset te publikojne artikuj te rinj.</p>
    </div>

    <div v-if="products.length > 0 && hasMoreProducts" class="home-catalog__footer">
      <div v-if="supportsAutoLoad" ref="loadMoreSentinel" aria-hidden="true"></div>
      <p v-if="loadingMoreProducts" class="market-status market-status--compact">
        Duke ngarkuar edhe produkte...
      </p>
      <button
        v-else-if="!supportsAutoLoad"
        class="market-button market-button--secondary"
        type="button"
        :disabled="loadingMoreProducts"
        @click="loadMoreProducts"
      >
        {{ loadingMoreProducts ? "Duke ngarkuar..." : "Shih me shume" }}
      </button>
    </div>
  </section>
</section>
```

Paste this CSS at the very end of your main stylesheet so it overrides the old homepage styling without changing the rest of the site:

```css
/* Homepage refresh 2026 - homepage only */

.home-page {
  gap: 1.25rem;
  padding-top: 1.25rem;
}

.home-page > section {
  margin-bottom: 0;
}

.home-page .market-card {
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 14px 40px rgba(15, 23, 42, 0.05);
}

.home-page .market-card:hover {
  border-color: rgba(37, 99, 235, 0.2);
  box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
}

.home-page__eyebrow {
  margin: 0;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #2563eb;
}

.home-page__hero {
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.68fr);
  align-items: stretch;
}

.home-page__hero-card {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  overflow: hidden;
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.12), transparent 36%),
    radial-gradient(circle at bottom right, rgba(20, 184, 166, 0.12), transparent 34%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
}

.home-page__hero-copy {
  display: grid;
  align-content: center;
  gap: 1rem;
  padding: clamp(1.25rem, 3vw, 2.5rem);
}

.home-page__hero-copy h1 {
  margin: 0;
  font-size: clamp(2.15rem, 5vw, 4.1rem);
  line-height: 0.98;
  letter-spacing: -0.05em;
  color: #0f172a;
}

.home-page__hero-lead {
  margin: 0;
  max-width: 58ch;
  font-size: 1rem;
  line-height: 1.65;
  color: #475569;
}

.home-page__search {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 0.75rem;
}

.home-page__search input {
  min-height: 52px;
  padding: 0 1rem;
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(255, 255, 255, 0.94);
  color: #0f172a;
}

.home-page__quick-links,
.home-page__hero-actions,
.home-page__seller-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.home-page__hero-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.home-page__hero-metric {
  display: grid;
  gap: 0.2rem;
  padding: 0.95rem 1rem;
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(255, 255, 255, 0.82);
}

.home-page__hero-metric strong {
  font-size: 1.35rem;
  line-height: 1;
  letter-spacing: -0.05em;
  color: #0f172a;
}

.home-page__hero-metric span {
  color: #475569;
  font-size: 0.86rem;
}

.home-page__hero-media {
  position: relative;
  min-height: 100%;
  background: linear-gradient(180deg, #dbeafe 0%, #f8fafc 100%);
}

.home-page__hero-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-page__hero-floating {
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  display: grid;
  gap: 0.35rem;
  padding: 1rem;
  border-radius: 20px;
  background: rgba(15, 23, 42, 0.8);
  color: #ffffff;
  backdrop-filter: blur(14px);
}

.home-page__hero-floating strong {
  font-size: 1.5rem;
  line-height: 1;
  letter-spacing: -0.04em;
}

.home-page__hero-floating small {
  color: rgba(255, 255, 255, 0.78);
}

.home-page__hero-rail {
  display: grid;
  gap: 0.9rem;
}

.home-page__mini-card {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  gap: 0.9rem;
  align-items: center;
  padding: 0.9rem;
  min-height: 110px;
}

.home-page__mini-card img {
  width: 88px;
  height: 88px;
  object-fit: cover;
  border-radius: 16px;
}

.home-page__mini-card-copy {
  display: grid;
  gap: 0.3rem;
}

.home-page__mini-card-copy span {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #64748b;
}

.home-page__mini-card-copy strong {
  font-size: 1rem;
  line-height: 1.25;
  color: #0f172a;
}

.home-page__mini-card-copy small {
  color: #475569;
  font-size: 0.85rem;
}

.home-page__utility-strip {
  display: grid;
  gap: 0.9rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.home-page__utility-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
  align-items: start;
  padding: 1rem;
  background: #ffffff;
}

.home-page__utility-icon {
  width: 46px;
  height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: #eff6ff;
  color: #2563eb;
}

.home-page__utility-icon svg {
  width: 22px;
  height: 22px;
  stroke: currentColor;
  stroke-width: 1.7;
  fill: none;
}

.home-page__utility-item strong {
  display: block;
  margin-bottom: 0.25rem;
  color: #0f172a;
  font-size: 0.92rem;
}

.home-page__utility-item p {
  margin: 0;
  color: #475569;
  font-size: 0.85rem;
  line-height: 1.55;
}

.home-page__section {
  display: grid;
  gap: 1rem;
}

.home-page__category-grid {
  display: grid;
  gap: 0.9rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.home-page__category-card {
  position: relative;
  overflow: hidden;
  min-height: 190px;
  padding: 1rem;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}

.home-page__category-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.18;
}

.home-page__category-card-body {
  position: relative;
  z-index: 1;
  display: grid;
  align-content: end;
  gap: 0.55rem;
  min-height: 100%;
}

.home-page__category-card strong {
  font-size: 1.2rem;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: #0f172a;
}

.home-page__category-card p {
  margin: 0;
  color: #475569;
  font-size: 0.88rem;
  line-height: 1.5;
  max-width: 28ch;
}

.home-page__seller-band {
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  padding: 1.25rem;
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 34%),
    linear-gradient(135deg, #eff6ff 0%, #ffffff 58%, #f0fdfa 100%);
}

.home-page__seller-brand {
  display: grid;
  gap: 0.9rem;
}

.home-page__seller-head {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.home-page__seller-head img,
.home-page__seller-mark {
  width: 88px;
  height: 88px;
  border-radius: 22px;
  flex: 0 0 auto;
}

.home-page__seller-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #dbeafe;
  color: #2563eb;
  font-size: 1.6rem;
  font-weight: 800;
}

.home-page__seller-head h2 {
  margin: 0 0 0.35rem;
  font-size: 1.4rem;
  letter-spacing: -0.04em;
  color: #0f172a;
}

.home-page__seller-head p:last-child {
  margin: 0;
  color: #475569;
  line-height: 1.6;
}

.home-page__seller-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
  align-items: center;
}

.home-page__seller-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 220px;
  padding: 0.7rem 0.8rem;
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(255, 255, 255, 0.9);
}

.home-page__seller-link img {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  object-fit: cover;
}

.home-page__seller-link strong {
  display: block;
  font-size: 0.92rem;
  line-height: 1.25;
  color: #0f172a;
}

.home-page__seller-link small {
  color: #475569;
}

.home-page__catalog-head {
  align-items: center;
}

.home-page__catalog-actions {
  display: grid;
  gap: 0.6rem;
  justify-items: end;
}

.home-page__collection-label {
  margin: 0;
  max-width: 34rem;
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.55;
  text-align: right;
}

.home-page__filters {
  display: grid;
  gap: 0.9rem;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  align-items: end;
}

.home-page__filters .market-form-field {
  margin: 0;
}

.home-page__filters .market-form-field select {
  min-height: 46px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.28);
}

.home-page__filters-actions {
  display: flex;
  align-items: end;
}

.home-page .product-collection__grid {
  gap: 0.9rem;
}

.home-page .product-card {
  border-radius: 22px;
  border-color: rgba(148, 163, 184, 0.18);
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.04);
}

.home-page .product-card:hover {
  border-color: rgba(37, 99, 235, 0.22);
  box-shadow: 0 20px 42px rgba(15, 23, 42, 0.08);
}

.home-page .product-card__body,
.home-page .product-card__content {
  padding: 0.95rem;
  gap: 0.65rem;
}

.home-page .product-card__title {
  font-size: 0.98rem;
}

.home-page .product-card__description {
  font-size: 0.84rem;
  line-height: 1.45;
}

.home-page .product-card__actions {
  padding: 0 0.95rem 0.95rem;
}

@media (max-width: 1180px) {
  .home-page__hero,
  .home-page__utility-strip,
  .home-page__category-grid {
    grid-template-columns: 1fr 1fr;
  }

  .home-page__hero-card,
  .home-page__seller-band {
    grid-template-columns: 1fr;
  }

  .home-page__seller-links {
    justify-content: flex-start;
  }
}

@media (max-width: 920px) {
  .home-page__hero,
  .home-page__utility-strip,
  .home-page__category-grid {
    grid-template-columns: 1fr;
  }

  .home-page__hero-metrics,
  .home-page__filters {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .home-page__search {
    grid-template-columns: 1fr;
  }

  .home-page__catalog-actions {
    justify-items: start;
  }

  .home-page__collection-label {
    text-align: left;
  }
}

@media (max-width: 640px) {
  .home-page {
    gap: 1rem;
  }

  .home-page__hero-copy {
    padding: 1rem;
  }

  .home-page__hero-metrics,
  .home-page__filters {
    grid-template-columns: 1fr;
  }

  .home-page__mini-card,
  .home-page__seller-head {
    grid-template-columns: 1fr;
    display: grid;
  }

  .home-page__seller-link {
    min-width: 0;
    width: 100%;
  }

  .home-page__quick-links,
  .home-page__hero-actions,
  .home-page__seller-links {
    width: 100%;
  }

  .home-page__quick-links > *,
  .home-page__hero-actions > *,
  .home-page__seller-links > .market-button {
    width: 100%;
  }
}
```
