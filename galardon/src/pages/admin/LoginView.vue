<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="login-icon">🔒</div>
          <h2 class="login-title">Admin Login</h2>
          <p class="login-subtitle">Acceso al panel de administración</p>
        </div>

        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <label class="form-label">Email</label>
            <Input
              v-model="email"
              type="email"
              placeholder="admin@example.com"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Contraseña</label>
            <Input v-model="password" type="password" placeholder="••••••••" />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            class="login-button"
          >
            Ingresar
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import { loginWithEmail } from "@/stores/auth.store";

const router = useRouter();
const email = ref("");
const password = ref("");

const login = async () => {
  try {
    await loginWithEmail(email.value, password.value);
    alert("✅ Login exitoso");
    router.push("/admin");
  } catch (e) {
    alert("❌ Error en login");
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-container {
  width: 100%;
  max-width: 420px;
}

.login-card {
  background: var(--white-pure);
  border-radius: 16px;
  padding: 3rem 2.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.login-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.login-subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.login-button {
  margin-top: 1rem;
  width: 100%;
}

@media (max-width: 480px) {
  .login-card {
    padding: 2rem 1.5rem;
  }
}
</style>
