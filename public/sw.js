if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + ".js", i).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, t) => {
    const r =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[r]) return;
    let o = {};
    const c = (e) => a(e, r),
      n = { module: { uri: r }, exports: o, require: c };
    s[r] = Promise.all(i.map((e) => n[e] || c(e))).then((e) => (t(...e), o));
  };
}
define(["./workbox-cb477421"], function (e) {
  "use strict";
  importScripts("fallback-VOCkZ6f8J3do4ImFZ3OFH.js"),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/Androids.png", revision: "682a78998feb48dc3c04b7d903a7132b" },
        { url: "/Apple.svg", revision: "9bd1ef0da43c2dbd6cf0dfcd24a50a1c" },
        { url: "/Despre.webp", revision: "0c2f193ef8f3058044f01b28b0b329b3" },
        { url: "/Gamma.png", revision: "27ed9f67ca1454c111da1f714a52b59e" },
        { url: "/Iphones.png", revision: "f9dedf6aea7728cd382cf1ae3359eb68" },
        { url: "/Livrare.png", revision: "090526e7a494ee89934c558560821309" },
        { url: "/Payments.png", revision: "4fa03717db6b847fbfb89cc54114d668" },
        { url: "/Playstore.svg", revision: "b0d116db73495787fea221a22e6bca75" },
        {
          url: "/_next/app-build-manifest.json",
          revision: "0a67a4590ec7dceb06ad76c8cfbb1c88",
        },
        {
          url: "/_next/static/VOCkZ6f8J3do4ImFZ3OFH/_buildManifest.js",
          revision: "313e2c5ae3531d7d57865a5ef17b30f5",
        },
        {
          url: "/_next/static/VOCkZ6f8J3do4ImFZ3OFH/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/0e5ce63c-58520078665823a6.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/0e762574-d56d7552ec26fbcb.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/1181-f6ec003211356e7e.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/1240-4b7220b6d33ee6dc.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/1517-92ed2816ecb95a3a.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/1851-94df3ab09e08c7dc.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/2315-673f66c41af80bef.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/2576-3d9128337dcd7bdb.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/2615-2d1dfe2cc891fca8.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/2938-feff551783709f59.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/3918-087dfae0142b63c8.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/4261-83d18823f34b9fa9.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/479ba886-f21025dec0095267.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/4839-0e821da61e8250ef.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/4bd1b696-808566f9da996611.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/5236-e9c0427400f67501.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/5560-163e9dc2961063a3.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/5e22fd23-0003d544a978fd34.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/6579-4909eb81e554d0bd.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/6996-82ab9be3b79c4b75.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/7266-2f24888b86a42d4f.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/7970-aa4d41bd2558ed85.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/832-c3cec9e18d36db56.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/8667-4222296ad34a417b.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/8e1d74a4-ab3227ae72cc9a98.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/9c4e2130-04c9059c0bc0188e.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(Legals Pages)/privacy-policy/page-5b851b0b44b6c9e9.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(Legals Pages)/return-refunds/page-a15a714d4cc08068.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(Legals Pages)/terms-and-conditions/page-fd2138ae28dbe79b.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(Legals Pages)/warranty/page-d57d7812eefe1b1c.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(Pages)/about/page-f56b9f62a4eb2a73.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(Pages)/contact/page-5d95e7a495f32a22.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(Pages)/delivery/page-a86a83002ded47c9.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(Pages)/shop/bestsellers/layout-e70e428c8ff38a39.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(Pages)/shop/bestsellers/page-0e6065bb59ec633a.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(Pages)/shop/discounts/layout-a8775da894a35cb4.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(Pages)/shop/discounts/page-4362566334dad1cc.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(Pages)/shop/layout-f46227b5755637e7.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/(Pages)/shop/page-8645f19ad8e29c4d.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/category/%5Bcategory%5D/%5Bsubcategory%5D/%5Bsubsubcategory%5D/page-76aeeed3fc2fd4b9.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/category/%5Bcategory%5D/%5Bsubcategory%5D/page-bd9d0a5f4414f53f.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/category/%5Bcategory%5D/page-3328e7e189687d81.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/checkout/lead/page-4ab5be44c2ff9caf.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/checkout/order/page-7afd602576116dd1.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/checkout/page-b0f95e9336aae70b.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/dashboard/page-e7f3aab56dcf5f91.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/forgot-password/page-f1dff4487895baed.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/layout-d649e155b89d25aa.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/offline/page-aa64bb1943b9db8b.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/page-b5f72a9039eb6776.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/product/%5Bproduct%5D/page-19cdfb981b2c9aa0.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/reset-password/page-a79af8ef760dd3b8.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/search/page-4d338f7a799195a7.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/%5Blocale%5D/wishlist/page-3fa8ebaeaf007498.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-9f6c91e86dc5e5b5.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/address/route-feeb566b9d68b30d.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/amoCrm/addLead/route-6fc1bb93355db442.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-c44964d3ee2e1874.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/auth/forgot-password/route-74805c108be1678a.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/auth/profile/route-0e8f5eed078e3c78.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/auth/register/route-9cf7ee583d12bc0e.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/auth/reset-password/route-277fcb543a801c84.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/auth/update-profile/route-25ace4ad306c20f8.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/cache/route-b9a6fc3be995de05.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/catNames/cat/route-77bb5ba62cd7649d.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/catNames/subCat/route-4c81906fa6cd56a6.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/catNames/subSubCat/route-76a10d1400fc01b0.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/categories/route-122bc79568a42512.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/contact/route-7357d1ed7108a29c.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/facebook-event/route-b1aa514f4c889bea.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/marketingDesign/route-23701a36db4491fa.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/meilisearch/route-31841454a5287ddb.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/newsLetter/route-d0b9e3404029afa9.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/orders/cuponUsage/route-4bce65c67b2c0ce5.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/orders/dashBoardOrders/route-37a2eb14d4fb9181.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/orders/fastOrder/route-6f60be9b954b6f20.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/orders/route-b9c9d0bcc6ec7410.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/pixels/route-7591fafce3c60158.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/allFilters/attributes/route-3dc9b8ad1533c381.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/allFilters/brands/route-86a9d1c9b5ee4039.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/allFilters/colors/route-c10fd9ab6015b222.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/allProducts/route-29851df4f04c1dc8.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/bestSellingFilters/attributes/route-2286a20416c80dcb.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/bestSellingFilters/brands/route-d4be91da53934218.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/bestSellingFilters/colors/route-b4a676780d479273.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/bestSellingProducts/route-8082e4fc9163732d.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/categoryFilters/attributes/route-e80e4590d28ad9e7.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/categoryFilters/brands/route-ad36cf0d3ab9e021.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/categoryFilters/colors/route-5bb92de14a39c282.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/categoryProducts/route-a04e1538532a5331.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/discountedFilters/attributes/route-2896eacef74303db.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/discountedFilters/brands/route-40e868a71f56e505.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/discountedFilters/colors/route-353badfa8620a209.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/discountedProducts/route-f6a2c0bc892554c7.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/maxPrice/route-3314bd2d1a0c83ff.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/product/route-b2129e249c182dc9.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/productVariants/route-e4962e4a4a950f41.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/similarProducts/route-dbfc2f065c8d8b77.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/stock/productpage/route-fa008bad68501ead.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/stock/route-143542293c825edd.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/subCategoryFilters/attributes/route-613e2a07f9dcb39f.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/subCategoryFilters/brands/route-6657d6b14b356d95.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/subCategoryFilters/colors/route-6db64c7b2df63a2b.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/subCategoryProducts/route-9f09559fda602dbd.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/subSubCategoryFilters/attributes/route-789ec4ba376770e7.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/subSubCategoryFilters/brands/route-944db9c9c09321e1.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/subSubCategoryFilters/colors/route-e46a9e9ddfb76e92.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/products/subSubCategoryProducts/route-13eca86f4bd5362c.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/push/route-07800404ebea95ee.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/revalidate/route-e64e65d8246bd2ba.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/statusChanged/route-4cbae7b14626ace4.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/subCategories/route-8f332c77ba182458.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/subSubCategories/route-edef36faba1b20c0.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/app/api/topCategories/route-9aebb993fa7a9220.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/f97e080b-7c45ba9acfe370df.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/framework-1ec85e83ffeb8a74.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/main-7cdfe4d430360020.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/main-app-29eccfa920f8db5e.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/pages/_app-5f03510007f8ee45.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/pages/_error-8efa4fbf3acc0458.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-b7cfc6ab9e90d465.js",
          revision: "VOCkZ6f8J3do4ImFZ3OFH",
        },
        {
          url: "/_next/static/css/647fffd6289e21fd.css",
          revision: "647fffd6289e21fd",
        },
        { url: "/facebook.svg", revision: "bcfa7fbd3bf5e1e4f172a0cf56859a5d" },
        { url: "/favicon.ico", revision: "ed21a514bba7559ee377203974ecc8e2" },
        {
          url: "/favicon/apple-touch-icon.png",
          revision: "dba24c22606869f96cbbc342fad6598f",
        },
        {
          url: "/favicon/favicon-96x96.png",
          revision: "f811cf96467241a9cf5fe7e3d2255790",
        },
        {
          url: "/favicon/favicon.ico",
          revision: "401379151b8123f7eb3c569fca268a05",
        },
        {
          url: "/favicon/favicon.svg",
          revision: "debfcfdafc8e0913b3743a1a98252d00",
        },
        {
          url: "/favicon/screenshots/Screenshot 1.png",
          revision: "e71a91822a8d0481cdb8ae6353fcaa13",
        },
        {
          url: "/favicon/screenshots/Screenshot 2.png",
          revision: "3d8a8d412eb8b778f3ad910963b6dcd6",
        },
        {
          url: "/favicon/site.webmanifest",
          revision: "aef3dd00e0dbaab61a5449d6940969f7",
        },
        {
          url: "/favicon/web-app-manifest-192x192.png",
          revision: "fb34785d9a1e59ae6429b37973a49313",
        },
        {
          url: "/favicon/web-app-manifest-512x512.png",
          revision: "ae1c03991fb72b5a37fa199cce4f7924",
        },
        { url: "/google.svg", revision: "64ac7e5288152732be55ea53a0d62d45" },
        { url: "/logo.png", revision: "264130390679a43f06aab796a4ea531e" },
        { url: "/offline", revision: "VOCkZ6f8J3do4ImFZ3OFH" },
        {
          url: "/splashscreens/10.2__iPad_portrait.png",
          revision: "fa8e3ef4b1ba62a9b52b01d9571a6bc0",
        },
        {
          url: "/splashscreens/10.5__iPad_Air_portrait.png",
          revision: "1f437c108b9b6bf061a0157a2cad1ba9",
        },
        {
          url: "/splashscreens/10.9__iPad_Air_portrait.png",
          revision: "0af57588ed05cf7defb4611c647eb517",
        },
        {
          url: "/splashscreens/11__iPad_Pro_M4_portrait.png",
          revision: "55f1f7068f706a9f4cc29e769ac3edd4",
        },
        {
          url: "/splashscreens/11__iPad_Pro__10.5__iPad_Pro_portrait.png",
          revision: "7d1085b6a7542c32e8420fac0b0b09c9",
        },
        {
          url: "/splashscreens/12.9__iPad_Pro_portrait.png",
          revision: "b049c8d88430571c36a5662be65b83b1",
        },
        {
          url: "/splashscreens/13__iPad_Pro_M4_portrait.png",
          revision: "5869f8cfef051860b812ed7caeb5aa8e",
        },
        {
          url: "/splashscreens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",
          revision: "baa9ad074a95c6653ea6f20f7628b2b4",
        },
        {
          url: "/splashscreens/8.3__iPad_Mini_portrait.png",
          revision: "c6c4553341e08bd047c3a9b6916f9b14",
        },
        {
          url: "/splashscreens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",
          revision: "2736ec24fb40d2f1f495c0b0563c1800",
        },
        {
          url: "/splashscreens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",
          revision: "c7b08bdd77e2252aa1e202159a60fdb1",
        },
        {
          url: "/splashscreens/iPhone_11__iPhone_XR_portrait.png",
          revision: "d450b1115e084e04881ea81bbacd8a4a",
        },
        {
          url: "/splashscreens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",
          revision: "ddbcad54773506e167908683951d1352",
        },
        {
          url: "/splashscreens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",
          revision: "b056c662b9a17b89eddb03ac5a25962d",
        },
        {
          url: "/splashscreens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",
          revision: "5067fc3e1110f42ae3272a27996c1954",
        },
        {
          url: "/splashscreens/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png",
          revision: "12d8661fc6b6b4a422e885a59dc07e8a",
        },
        {
          url: "/splashscreens/iPhone_16_Pro_Max_portrait.png",
          revision: "02a165cd9889cf99369263a49e635e57",
        },
        {
          url: "/splashscreens/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png",
          revision: "78b58353afe1e2b68c299731ae3d97c2",
        },
        {
          url: "/splashscreens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",
          revision: "310f70063b8b26b9818216d219ec6f3b",
        },
        {
          url: "/splashscreens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",
          revision: "ff0cf601add0d5ef34ec1866c28b7896",
        },
        { url: "/Доставка.png", revision: "efa1d63af9ea40b789ea0a438bda7991" },
        { url: "/О-нас.webp", revision: "28e798c1c789e3676cd6767418add36a" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: i,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https?.*/,
      new e.NetworkFirst({
        cacheName: "offlineCache",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    );
});

self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();

    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: "/favicon/web-app-manifest-192x192.png",
        badge: "/favicon/web-app-manifest-192x192.png",
        vibrate: [200, 100, 200],
      })
    );
  }
});
