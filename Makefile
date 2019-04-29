VENV=venv

.PHONY: watch
watch: venv
	bundle exec jekyll serve --source docs/

# watch-fast doesn't handle new files / routing changes well.
.PHONY: watch-fast
watch-fast: venv
	bundle exec jekyll serve --source docs/ --incremental

.PHONY: test
test: venv
	bundle exec rake test

venv:
	virtualenv ${VENV}
	./scripts/setup-virtual-gems.sh ${VENV}