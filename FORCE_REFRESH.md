# 🔄 Force Refresh - See Enhanced UI

## Steps to See the Enhanced KalaChain UI:

### 1. **Stop Current Dev Server**
   Press `Ctrl+C` in the terminal where `npm run dev` is running

### 2. **Clear All Caches**
   ```bash
   rm -rf .next
   ```

### 3. **Restart Dev Server**
   ```bash
   npm run dev
   ```

### 4. **Hard Refresh Browser**
   - **Windows/Linux**: `Ctrl + Shift + R`
   - **Mac**: `Cmd + Shift + R`
   - Or: Open DevTools (F12) → Right-click refresh → "Empty Cache and Hard Reload"

### 5. **Verify You See Enhanced UI**

Look for these indicators:
- ✅ Header says **"KalaChain"** (not "Nepal NFT Marketplace")
- ✅ Tagline: "Connecting Culture through Blockchain"
- ✅ Dark mode toggle button (☀️/🌙) in header
- ✅ "Connect Wallet" gradient button
- ✅ Glassmorphic map with rounded corners
- ✅ Product cards have 3D hover effects
- ✅ Smooth animations on page load

If you still see the old UI, check browser console (F12) for any errors.



