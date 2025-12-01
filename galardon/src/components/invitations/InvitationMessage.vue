<template>
  <div class="invitation-card">
    <div class="decoration-top"></div>

    <div class="cap-icon">🎓</div>

    <h1 class="invitation-title">Estás Invitado</h1>

    <div class="divider"></div>

    <p class="invitation-subtitle">Cena de Graduación</p>

    <div class="invitation-details">
      <div class="detail-item">
        <span class="detail-icon">📅</span>
        <div class="detail-content">
          <span class="detail-label">Fecha</span>
          <span class="detail-value">20 de Junio, 2026</span>
        </div>
      </div>

      <div class="detail-item">
        <span class="detail-icon">⏰</span>
        <div class="detail-content">
          <span class="detail-label">Hora</span>
          <span class="detail-value">20:30</span>
        </div>
      </div>

      <div class="detail-item">
        <span class="detail-icon">🏛️</span>
        <div class="detail-content">
          <span class="detail-label">Lugar</span>
          <span class="detail-value">Bodega el Riojano</span>
        </div>
      </div>
    </div>

    <p class="invitation-footer">
      Agradecería tu confirmación para poder esperarte
    </p>

    <div class="decoration-bottom"></div>
  </div>
</template>

<script setup lang="ts">
// Componente puramente visual
</script>

<style scoped>
.invitation-card {
  background: linear-gradient(135deg, var(--white-pure) 0%, var(--ivory) 100%);
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: var(--shadow-gold);
  position: relative;
  overflow: hidden;
  text-align: center;
  border: 2px solid var(--gold-light);
  transition: all var(--transition-normal);
}

.invitation-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(212, 175, 55, 0.35);
}

.decoration-top,
.decoration-bottom {
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--gold-light) 20%,
    var(--gold-primary) 50%,
    var(--gold-light) 80%,
    transparent 100%
  );
}

.decoration-top {
  top: 0;
}

.decoration-bottom {
  bottom: 0;
}

.cap-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.invitation-title {
  font-family: var(--font-elegant);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--gold-dark);
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(212, 175, 55, 0.1);
}

.divider {
  width: 80px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--gold-primary),
    transparent
  );
  margin: 1.5rem auto;
}

.invitation-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.invitation-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem 0;
  padding: 2rem;
  background: rgba(244, 229, 194, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--white-pure);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.detail-item:hover {
  transform: translateX(8px);
  box-shadow: var(--shadow-md);
}

.detail-icon {
  font-size: 1.75rem;
  min-width: 40px;
  text-align: center;
}

.detail-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
}

.detail-label {
  font-size: 0.75rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.detail-value {
  font-size: 1.1rem;
  color: var(--text-primary);
  font-weight: 600;
}

.invitation-footer {
  font-size: 1rem;
  color: var(--text-secondary);
  font-style: italic;
  margin-top: 2rem;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .invitation-card {
    padding: 2rem 1.5rem;
  }

  .invitation-title {
    font-size: 2rem;
  }

  .cap-icon {
    font-size: 3rem;
  }
}
</style>
