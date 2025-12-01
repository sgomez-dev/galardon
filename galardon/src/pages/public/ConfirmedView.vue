<template>
  <div class="invitation-page">
    <div class="confirmed-container">
      <div class="confirmed-card">
        <div class="success-icon">✨</div>
        <h1 class="confirmed-title">¡Confirmación Recibida!</h1>
        <div class="divider"></div>
        <p class="confirmed-message">Gracias por confirmar tu asistencia.</p>
        <p class="confirmed-submessage">
          🎉 Nos vemos en la cena de graduación 🎓
        </p>
        <div class="celebration-emoji">
          <span class="float-1">🎈</span>
          <span class="float-2">🎆</span>
          <span class="float-3">🎊</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Página de confirmación
</script>

<style scoped>
.confirmed-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.confirmed-card {
  background: linear-gradient(135deg, var(--white-pure) 0%, var(--ivory) 100%);
  border-radius: 24px;
  padding: 4rem 3rem;
  box-shadow: var(--shadow-gold);
  border: 2px solid var(--gold-light);
  text-align: center;
  position: relative;
  overflow: hidden;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.1) rotate(5deg);
    opacity: 0.9;
  }
}

.confirmed-title {
  font-family: var(--font-elegant);
  font-size: 2.5rem;
  color: var(--gold-dark);
  margin-bottom: 1rem;
  font-weight: 700;
}

.divider {
  width: 100px;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--gold-primary),
    transparent
  );
  margin: 2rem auto;
}

.confirmed-message {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 500;
}

.confirmed-submessage {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.celebration-emoji {
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-size: 2rem;
  margin-top: 2rem;
}

.celebration-emoji span {
  display: inline-block;
}

.float-1 {
  animation: float-1 3s ease-in-out infinite;
}

.float-2 {
  animation: float-2 3.5s ease-in-out infinite;
}

.float-3 {
  animation: float-3 4s ease-in-out infinite;
}

@keyframes float-1 {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(10deg);
  }
}

@keyframes float-2 {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(-10deg);
  }
}

@keyframes float-3 {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-18px) rotate(8deg);
  }
}

@media (max-width: 640px) {
  .confirmed-card {
    padding: 3rem 2rem;
  }

  .confirmed-title {
    font-size: 2rem;
  }

  .success-icon {
    font-size: 4rem;
  }
}
</style>
